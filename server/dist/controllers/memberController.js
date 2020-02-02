"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var user_1 = __importDefault(require("../models/user"));
var member_1 = __importDefault(require("../models/member"));
module.exports = {
    checkPermission: function (req, res, next) {
        user_1.default.findById(res.locals.userId).then(function (user) {
            if (user !== null) {
                var permission = user.permission;
                if (permission === "root") {
                    next();
                }
                else {
                    res.send({
                        message: "アップロードを行う権限がありません。"
                    });
                }
            }
        });
    },
    upload: function (req, res, next) {
        var data = req.body;
        member_1.default.create(__assign({}, data))
            .then(function () {
            member_1.default.find({}).then(function (members) {
                res.send({
                    message: "正常にデータがアップロードされました。",
                    members: members
                });
            });
        })
            .catch(function (error) {
            next(error);
        });
    },
    update: function (req, res, next) {
        var memberId = req.body._id;
        member_1.default.findByIdAndUpdate(memberId, {
            $set: req.body
        })
            .then(function () {
            member_1.default.find({}).then(function (members) {
                res.send({
                    message: "正常にデータが正常にアップデートされました。",
                    members: members
                });
            });
        })
            .catch(function (error) {
            next(error);
        });
    },
    delete: function (req, res, next) {
        var memberId = req.body.memberId;
        member_1.default.findByIdAndRemove(memberId).then(function () {
            user_1.default.find({}).then(function (users) {
                users.forEach(function (user) {
                    user_1.default.findByIdAndUpdate(user._id, {
                        $pull: { favoriteMembers: memberId }
                    }, { new: true }).then(function (user) {
                        if (user !== null) {
                            if (res.locals.userId == user._id) {
                                member_1.default.find({}).then(function (members) {
                                    res.send({
                                        message: "メンバーデータの削除が正常に行われました。",
                                        members: members,
                                        user: {
                                            favoriteMembers: user.favoriteMembers
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            });
        });
    },
    getAllMembers: function (req, res, next) {
        member_1.default.find({})
            .then(function (members) {
            res.send({
                members: members
            });
        })
            .catch(function (error) {
            next(error);
        });
    }
};
