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
                        console.log(user)
                        res.send(user);
                    })
                    .catch(error => {
                        console.log(`Error updating user by ID: ${error.message}`);
                        next(error);
                    })
                }
            })
        }
    },
};