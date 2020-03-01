"use strict";

import mongoose from "mongoose";
import { MemberDocument } from "./member";
import { ChatDocument } from "./chat";
const { Schema } = mongoose;

export type TalkDocument = {
  _id: mongoose.Schema.Types.ObjectId[]
  roomName: string;
  description: string;
  isRock: boolean;
  password: string;
  image: mongoose.Schema.Types.ObjectId[] | MemberDocument[];
  chat: mongoose.Schema.Types.ObjectId[] | ChatDocument[];
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const talkSchema = new Schema<TalkDocument>(
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
      required: true
    },
    password: {
      type: String
    },
    image: {
      type: [{ type: Schema.Types.ObjectId, ref: "Member" }]
    },
    chat: {
      type: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Talk = mongoose.model<TalkDocument>("Talk", talkSchema);

export default Talk;
