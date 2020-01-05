"use strict";

const User = require("../models/user"),
Member = require("../models/member"),
jsonWebToken = require("jsonwebtoken");

module.exports = {
    checkPermission: (req, res, next) => {
        let token = req.headers.authorization;
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
    update: (req, res, next) => {
        let memberId = req.body._id;
        Member.findByIdAndUpdate(memberId,{
            $set: req.body
        }).then(() => {
            Member.find({}).then(members => {
                res.send({
                    message: '正常にデータが正常にアップデートされました。',
                    members
                });
            });
        }).catch(error => {
            next(error)
        })
    },
    delete: (req, res, next) => {
        let {memberId} = req.body
        Member.findByIdAndRemove(memberId).then(() => {
            Member.find({}).then(members => {
                res.send({
                    message: 'メンバーデータの削除が正常に行われました。',
                    members
                });
            });
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
    }
};