"use strict"

import mongoose from "mongoose";
const { Schema } = mongoose;

const talkSchema = new Schema(
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

const Talk = mongoose.model("Talk", talkSchema);

export default Talk;