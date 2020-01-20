"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

let talkSchema = new Schema(
    {
        roomName: {
            type: String,
            trim: true,
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
        },
        chat: {
            type: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
            default: []
        }
},{
    timestamps: true
});

module.exports = mongoose.model("Talk", talkSchema);