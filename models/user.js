"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

let userSchema = new Schema(
    {
        // name: {
        //     first: {
        //         type: String,
        //         trim: true
        //     },
        //     last: {
        //         type: String,
        //         trim: true,
        //     }
        // },
        // nickName: {
        //     type: String,
        //     trim: true,
        // },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
},{
    timestamps: true
})

module.exports = mongoose.model("user", userSchema);