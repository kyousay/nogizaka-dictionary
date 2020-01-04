"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new Schema(
    {
        nickName: {
            type: String,
            trim: true,
            max: 10
        },
        message: {
            type: String,
            trim: true,
            max: 60
        },
        rank: {
            type: String,
            trim: true,
            max: 10
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        permission: {
            type: String,
        }
},{
    timestamps: true
});

userSchema.pre("save", function(next) {
    let user = this;
    if(user.email === 'yusei5884@gmail.com') {
        user.permission = 'root';
    } else {
        user.permission = 'user';
    }
    next();
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
})

module.exports = mongoose.model("User", userSchema);