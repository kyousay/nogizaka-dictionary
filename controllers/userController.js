"use strict";

const User = require("../models/user"),
httpStatus = require("http-status-codes"),
jsonWebToken = require("jsonwebtoken");

module.exports = {
    update: (req, res, next) => {
        let token = req.headers.authorization;
        let userParams = {
            nickName: req.body.nickName,
            message: req.body.message,
            rank: req.body.rank
        }
        if(token) {
            jsonWebToken.verify(token, "effort_thanks_smile", (error, payload) => {
                if(payload) {
                    let userId = payload.data;
                    User.findByIdAndUpdate(userId,{
                        $set: userParams
                    })
                    .then(user => {
                        res.send(req.body);
                    })
                    .catch(error => {
                        console.log(`Error updating user by ID: ${error.message}`);
                        next(error);
                    })
                }
            })
        }
    },
    favorite: (req, res, next) => {
        let token = req.headers.authorization;
        let favoriteId = req.body.id
        if(token) {
            jsonWebToken.verify(token, "effort_thanks_smile", (error, payload) => {
                if(payload) {
                    let userId = payload.data;
                    User.findById(userId).then(user => {
                        let newFavoriteMembers= [];
                        if(user.favoriteMembers.length > 0) {
                            newFavoriteMembers = user.favoriteMembers.concat([favoriteId]);
                        }else {
                            newFavoriteMembers.push(favoriteId)
                        }
                        User.findByIdAndUpdate(userId, {
                                $set: { favoriteMembers: newFavoriteMembers }
                        }).then(() => {
                            User.findById(userId).then((latestUser) => {
                                res.send(latestUser)
                            });
                        });
                    });
                }
            });
        }
    },
    unfavorite: (req, res, next) => {
        let token = req.headers.authorization;
        let favoriteId = req.body.id
        if(token) {
            jsonWebToken.verify(token, "effort_thanks_smile", (error, payload) => {
                if(payload) {
                    let userId = payload.data;
                    User.findById(userId).then(user => {
                        let newFavoriteMembers = [];
                        user.favoriteMembers.forEach((memberId,index) => {
                            if(memberId != favoriteId) {
                                newFavoriteMembers.push(memberId);
                            }
                        })
                        User.findByIdAndUpdate(userId, {
                                $set: { favoriteMembers: newFavoriteMembers }
                        }).then(() => {
                            User.findById(userId).then((latestUser) => {
                                res.send(latestUser)
                            });
                        });
                    });
                }
            });
        }
    }
};