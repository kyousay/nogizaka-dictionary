"use strict";

import mongoose from "mongoose";
const { Schema } = mongoose;

export type ChatDocument = {
  _id: mongoose.Schema.Types.ObjectId[];
  userId: mongoose.Schema.Types.ObjectId[];
  userName: string;
  chat: string;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const chatSchema = new Schema<ChatDocument>(
  {
    userId: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    userName: {
      type: String,
      trim: true,
      max: 10,
      required: true
    },
    chat: {
      type: String,
      trim: true,
      max: 120,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model<ChatDocument>("Chat", chatSchema);

export default Chat;
