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
},{
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
})

module.exports = mongoose.model("User", userSchema);