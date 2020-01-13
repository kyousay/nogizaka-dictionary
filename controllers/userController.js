"use strict";

const User = require("../models/user"),
httpStatus = require("http-status-codes"),
jsonWebToken = require("jsonwebtoken");

module.exports = {
    update: (req, res, next) => {
        let userParams = {
            nickName: req.body.nickName,
            message: req.body.message,
            rank: req.body.rank
        }
        User.findByIdAndUpdate(res.locals.userId,{
            $set: userParams
        })
        .then(() => {
            res.send(req.body);
        })
        .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        })
    },
    favorite: (req, res, next) => {
        let favoriteId = req.body.id
        User.findByIdAndUpdate(res.locals.userId, {
                $addToSet: { favoriteMembers: favoriteId }
        },
        {new: true}
        ).then((user) => {
            res.send(user)
        });
    },
    unfavorite: (req, res, next) => {
        let favoriteId = req.body.id
        User.findByIdAndUpdate(res.locals.userId, {
                $pull: { favoriteMembers: favoriteId }
        },
        {new: true}).then((user) => {
                res.send(user);
        });
    }
};