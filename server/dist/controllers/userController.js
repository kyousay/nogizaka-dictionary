"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var user_1 = __importDefault(require("../models/user"));
var getUserData = function (data) {
    return {
        permission: data.permission,
        favoriteMembers: data.favoriteMembers,
        nickName: data.nickName,
        message: data.message,
        rank: data.rank
    };
};
module.exports = {
    update: function (req, res, next) {
        var userParams = {
            nickName: req.body.nickName,
            message: req.body.message,
            rank: req.body.rank
        };
        user_1.default.findByIdAndUpdate(res.locals.userId, {
            $set: userParams
        })
            .then(function () {
            res.send(req.body);
        })
            .catch(function (error) {
            next(error);
        });
    },
    favorite: function (req, res, next) {
        var favoriteId = req.body.id;
        user_1.default.findByIdAndUpdate(res.locals.userId, {
            $addToSet: { favoriteMembers: favoriteId }
        }, { new: true }).then(function (user) {
            var userData = getUserData(user);
            res.send(userData);
        });
    },
    unfavorite: function (req, res, next) {
        var favoriteId = req.body.id;
        user_1.default.findByIdAndUpdate(res.locals.userId, {
            $pull: { favoriteMembers: favoriteId }
        }, { new: true }).then(function (user) {
            var userData = getUserData(user);
            res.send(userData);
        });
    }
};
