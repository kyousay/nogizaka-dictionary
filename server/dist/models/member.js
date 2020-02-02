"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var memberSchema = new Schema({
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
}, {
    timestamps: true
});
memberSchema.virtual("search").get(function () {
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
var Member = mongoose_1.default.model("Member", memberSchema);
exports.default = Member;
