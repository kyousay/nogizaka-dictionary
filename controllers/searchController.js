"use strict";

const User = require("../models/user"),
Member = require("../models/member");

module.exports = {
    searchSegment: (req, res, next) => {
        const key = Object.keys(req.query)[0];
        const query = req.query[key];
        if(key === 'favorite'){
            User.findById(res.locals.userId).populate("favoriteMembers").then(user => {
                res.send({members: user.favoriteMembers})
            })
        } else if(key === 'members') {
            Member.find({}).then(members => {
                res.send({members});
            })
        } else {
            Member.find({segment:query}).then(members => {
                res.send({members});
            })
        }
    },
};