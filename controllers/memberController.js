"use strict";

const User = require("../models/user"),
Member = require("../models/member"),
jsonWebToken = require("jsonwebtoken");

module.exports = {
    checkPermission: (req, res, next) => {
        let token = req.headers.authorization;
        let data = req.body
        if(token) {
            jsonWebToken.verify(token, "effort_thanks_smile", (error, payload) => {
                if(payload) {
                    User.findById(payload.data).then(user => {
                        let permission = user.permission;
                        if(permission === 'root') {
                            next();
                        }else {
                            res.send({
                                message: "アップロードを行う権限がありません。"
                            });
                        }
                    })
                } else {
                    res.status(httpStatus.UNAUTHORIZED).json({
                        error: true,
                        message: "正しく認証が行えませんでした。恐れ入りますが、ログインからやり直してください。"
                    });
                    next();
                }
            });
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "正しく認証が行えませんでした。恐れ入りますが、ログインからやり直してください。"
            });
        }
    },
    upload: (req, res, next) => {
        let data = req.body
        Member.create({
            ...data
        }).then(member => {
            Member.find({}).then(members => {
                res.send({
                    message: '正常にデータがアップロードされました。',
                    member,
                    members
                });
            });
        }).catch(error => {
            next(error)
        })
    },
    getAllMembers: (req, res, next) => {
        Member.find({}).then(members => {
            res.send({
                members
            });
        }).catch(error => {
            next(error);
        });
    },
    test: (req, res, next) => {
        let memberId = req.params.id

        console.log(req.params);
        console.log(memberId);
    }
};