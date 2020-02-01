"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var talkSchema = new Schema({
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
    password: {
        type: String,
    },
    image: {
        type: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    },
    chat: {
        type: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
        default: []
    }
}, {
    timestamps: true
});
var Talk = mongoose_1.default.model("Talk", talkSchema);
exports.default = Talk;
