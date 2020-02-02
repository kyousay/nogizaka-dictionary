"use strict";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";

const { Schema } = mongoose;

export type UserDocument = {
  _id: typeof mongoose.Schema.Types.ObjectId
  nickName: string;
  message: string;
  rank: string;
  email: string;
  favoriteMembers: typeof mongoose.Schema.Types.ObjectId;
  permission: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  passwordComparison: (inputPassword: string) => Promise<boolean>;
} & mongoose.Document;

const userSchema = new Schema<UserDocument>(
  {
    nickName: {
      type: String,
      default: "新参者",
      trim: true,
      max: 10
    },
    message: {
      type: String,
      default: "こんにちは。",
      trim: true,
      max: 60
    },
    rank: {
      type: String,
      default: "アンダー",
      trim: true,
      max: 10
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    favoriteMembers: {
      type: [{ type: Schema.Types.ObjectId, ref: "Member" }],
      default: []
    },
    permission: {
      type: String,
      default: "user"
    },
    password: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre<UserDocument>("save", function(next: NextFunction) {
  const user = this;
  if (user.email === "yusei5884@gmail.com") {
    user.permission = "root";
  }
  bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(error => {
      console.log(`Error in hashing password: ${error.message}`);
      next(error);
    });
});

userSchema.methods.passwordComparison = function(
  inputPassword: string
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(inputPassword, user.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
