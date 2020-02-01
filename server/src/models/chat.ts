"use strict"

import mongoose from "mongoose"
const { Schema } = mongoose

const chatSchema = new Schema(
    {
        userId: {
            type: [{ type: Schema.Types.ObjectId, ref: "User" }]
        },
        userName: {
            type: String,
            trim: true,
            max: 10,
            required: true,
        },
        chat: {
            type: String,
            trim: true,
            max: 120,
            required: true,
        },
},{
    timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;