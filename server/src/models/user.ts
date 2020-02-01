"use strict"

import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        nickName: {
            type: String,
            default: '新参者',
            trim: true,
            max: 10
        },
        message: {
            type: String,
            default: 'こんにちは。',
            trim: true,
            max: 60
        },
        rank: {
            type: String,
            default: 'アンダー',
            trim: true,
            max: 10
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        favoriteMembers:{
            type: [{ type: Schema.Types.ObjectId, ref: "Member" }],
            default: []
        },
        permission: {
            type: String,
            default: 'user'
        },
        password: {
            type: String,
            default: ''
        }
},{
    timestamps: true
});

type UserDocument = {
    nickName: String
    message: String
    rank: String
    email: String
    favoriteMembers: Object[]
    permission: String
    password: String
    created_at: Date
    updated_at: Date
} & mongoose.Document;

userSchema.pre<UserDocument>("save", function(next: any) {
    let user = this;
    if(user.email === 'yusei5884@gmail.com') {
        user.permission = 'root';
    }
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next();
    }).catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    })
})

userSchema.methods.passwordComparison = function(inputPassword: string) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password)
}

const User = mongoose.model("User", userSchema);

export default User 