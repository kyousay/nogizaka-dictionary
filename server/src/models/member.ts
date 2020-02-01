"use strict"

import mongoose from "mongoose";
const { Schema } = mongoose;

const memberSchema = new Schema(
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
        dateOfBirth : {
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
        hash:{
            type: [String],
            trim: true
        },
},{
    timestamps: true
});

type MemberDocument = {
    image: String
    name: String[]
    sailium: String[]
    segment: String
    dateOfBirth: String
    blod: String
    height: String
    hash: String[]
}

memberSchema.virtual("search").get(function(this: MemberDocument) {
    return [this.name, this.sailium, this.segment, this.dateOfBirth, this.blod, this.height, this.hash]
});

memberSchema.set("toJSON", { virtuals: true });

const Member = mongoose.model("Member", memberSchema);

export default Member