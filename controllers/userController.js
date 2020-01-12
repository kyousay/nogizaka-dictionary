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
        User.findById(res.locals.userId).then(user => {
            let newFavoriteMembers= [];
            if(user.favoriteMembers.length > 0) {
                newFavoriteMembers = user.favoriteMembers.concat([favoriteId]);
            }else {
                newFavoriteMembers.push(favoriteId)
            }
            User.findByIdAndUpdate(res.locals.userId, {
                    $set: { favoriteMembers: newFavoriteMembers }
            }).then(() => {
                User.findById(res.locals.userId).then((latestUser) => {
                    res.send(latestUser)
                });
            });
        });
    },
    unfavorite: (req, res, next) => {
        let favoriteId = req.body.id
        User.findById(res.locals.userId).then(user => {
            let newFavoriteMembers = [];
            user.favoriteMembers.forEach((memberId,index) => {
                if(memberId != favoriteId) {
                    newFavoriteMembers.push(memberId);
                }
            })
            User.findByIdAndUpdate(res.locals.userId, {
                    $set: { favoriteMembers: newFavoriteMembers }
            }).then(() => {
                User.findById(res.locals.userId).then((latestUser) => {
                    res.send(latestUser)
                });
            });
        });
    }
};