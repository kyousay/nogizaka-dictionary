"use strict";

const User = require("../models/user"),
    getUserParams = body => {
        return {
            email: body.email,
            password: body.password
        }
    }

module.exports = {
    create: (req, res, next) => {
        let userParams = getUserParams(req.body);

        User.create(userParams)
        .then(user => {
            console.log(user);
            res.send("新しいアカウントを作成しました。ログインをお願いします。");
        }).catch(error => {
            res.send("このEmailアドレスは既に登録済みです。");
            console.log(error);
        });
    },
    login: (req, res, next) => {
        let userParams = getUserParams(req.body);

        User.find()
    }
}