"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
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
}, {
    timestamps: true
});
userSchema.pre("save", function (next) {
    var user = this;
    if (user.email === "yusei5884@gmail.com") {
        user.permission = "root";
    }
    bcrypt_1.default
        .hash(user.password, 10)
        .then(function (hash) {
        user.password = hash;
        next();
    })
        .catch(function (error) {
        console.log("Error in hashing password: " + error.message);
        next(error);
    });
});
userSchema.methods.passwordComparison = function (inputPassword) {
    var user = this;
    return bcrypt_1.default.compare(inputPassword, user.password);
};
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
