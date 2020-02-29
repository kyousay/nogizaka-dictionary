"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var chatSchema = new Schema({
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
}, {
    timestamps: true
});
var Chat = mongoose_1.default.model("Chat", chatSchema);
exports.default = Chat;
