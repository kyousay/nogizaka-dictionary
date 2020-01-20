"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

let chatSchema = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            max: 10,
            required: true,
        },
        chat: {
            type: String,
            trim: true,
            required: true,
        },
},{
    timestamps: true
});

module.exports = mongoose.model("Chat", chatSchema);