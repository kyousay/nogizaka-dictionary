"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
bcrypt = require('bcrypt');

let userSchema = new Schema(
    {
        nickName: {
            type: String,
            default: '新参者',
            trim: true,
            max: 10
        },
        message: {
            type: String,
            default: 'こんにちは。',
            trim: true,
            max: 60
        },
        rank: {
            type: String,
            default: 'アンダー',
            trim: true,
            max: 10
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        favoriteMembers:{
            type: [{ type: Schema.Types.ObjectId, ref: "Member" }],
            default: []
        },
        permission: {
            type: String,
            default: 'user'
        },
        password: {
            type: String,
            default: ''
        }
},{
    timestamps: true
});

userSchema.pre("save", function(next) {
    let user = this;
    if(user.email === 'yusei5884@gmail.com') {
        user.permission = 'root';
    }
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next();
    }).catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    })
})

userSchema.methods.passwordComparison = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password)
}

module.exports = mongoose.model("User", userSchema);