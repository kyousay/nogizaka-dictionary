"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
bcrypt = require("bcrypt");

let talkSchema = new Schema(
    {
        roomName: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            max: 10
        },
        description: {
            type: String,
            trim: true,
            required: true,
            max: 60
        },
        isRock: {
            type: Boolean,
            required: true,
        },
        password:{
            type: String,
        },
        image: {
            type: [{ type: Schema.Types.ObjectId, ref: "Member" }],
        }
},{
    timestamps: true
});

talkSchema.pre("save", function(next) {
    let talk = this;

    bcrypt.hash(talk.password, 10).then(hash => {
        talk.password = hash;
        next();
    })
    .catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    });
});

talkSchema.methods.passwordComparison = function(inputPassword) {
    let talk = this;

    return bcrypt.compare(inputPassword, talk.password);
};

module.exports = mongoose.model("Talk", talkSchema);