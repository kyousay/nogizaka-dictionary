"use strict";

import mongoose from "mongoose";
const { Schema } = mongoose;

export type MemberDocument = {
  _id: mongoose.Schema.Types.ObjectId
  image: string;
  name: string[];
  sailium: string[];
  segment: string;
  dateOfBirth: string;
  blod: string;
  height: string;
  hash: string[];
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document & {
  search: [{
    name: string[];
    sailium: string[];
    segment: string;
    dateOfBirth: string;
    blod: string;
    height: string;
    hash: string[];
  }]
};

const memberSchema = new Schema<MemberDocument>(
  {
    image: {
      type: String,
      trim: true
    },
    name: {
      type: [String],
      trim: true
    },
    sailium: {
      type: [String],
      trim: true
    },
    segment: {
      type: String,
      trim: true
    },
    dateOfBirth: {
      type: String,
      trim: true
    },
    blod: {
      type: String,
      trim: true
    },
    height: {
      type: String,
      trim: true
    },
    hash: {
      type: [String],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

memberSchema.virtual("search").get(function(this: MemberDocument) {
  return [
    this.name,
    this.sailium,
    this.segment,
    this.dateOfBirth,
    this.blod,
    this.height,
    this.hash
  ];
});

memberSchema.set("toJSON", { virtuals: true });

const Member = mongoose.model<MemberDocument>("Member", memberSchema);

export default Member;
