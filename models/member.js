"use strict"

const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

let memberSchema = new Schema(
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

memberSchema.virtual("search").get(function() {
    return [this.name, this.sailium, this.segment, this.dateOfBirth, this.blod, this.height, this.hash]
})

module.exports = mongoose.model("Member", memberSchema);