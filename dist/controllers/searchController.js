"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var user_1 = __importDefault(require("../models/user"));
var member_1 = __importDefault(require("../models/member"));
module.exports = {
    searchSegment: function (req, res, next) {
        var key = Object.keys(req.query)[0];
        var query = req.query[key];
        if (key === "favorite") {
            user_1.default.findById(res.locals.userId)
                .populate("favoriteMembers")
                .then(function (user) {
                if (user !== null) {
                    res.send({ members: user.favoriteMembers });
                }
            });
        }
        else if (key === "members") {
            member_1.default.find({}).then(function (members) {
                res.send({ members: members });
            });
        }
        else {
            member_1.default.find({ segment: query }).then(function (members) {
                res.send({ members: members });
            });
        }
    },
    searchFreeword: function (req, res, next) {
        var word = req.query.word;
        member_1.default.find({}).then(function (members) {
            var result = [];
            members.forEach(function (member, index) {
                var searchs = member.search;
                var isResult = false;
                searchs.forEach(function (search) {
                    if (isResult !== true) {
                        if (Array.isArray(search)) {
                            search.forEach(function (value) {
                                if (value === word) {
                                    isResult = true;
                                }
                            });
                        }
                        else {
                            isResult = search == word;
                        }
                    }
                });
                if (isResult) {
                    result.push(member);
                }
            });
            if (result.length > 0) {
                res.send({
                    isResult: true,
                    result: result
                });
            }
            else {
                res.send({
                    isResult: false,
                    result: []
                });
            }
        });
    }
};
