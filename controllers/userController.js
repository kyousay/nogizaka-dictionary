"use strict";

const User = require("../models/user"),
getUserData = data => {
    return {
        permission: data.permission,
        favoriteMembers: data.favoriteMembers,
        nickName: data.nickName,
        message: data.message,
        rank: data.rank
    }
};

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
            next(error);
        })
    },
    favorite: (req, res, next) => {
        let favoriteId = req.body.id
        User.findByIdAndUpdate(res.locals.userId, {
                $addToSet: { favoriteMembers: favoriteId }
        },
        {new: true}
        ).then(user => {
            const userData = getUserData(user);
            res.send(userData);
        });
    },
    unfavorite: (req, res, next) => {
        let favoriteId = req.body.id
        User.findByIdAndUpdate(res.locals.userId, {
                $pull: { favoriteMembers: favoriteId }
        },
        {new: true}).then(user => {
            const userData = getUserData(user);
            res.send(userData);
        });
    }
};