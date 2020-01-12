"use strict";

const User = require("../models/user"),
Member = require("../models/member"),
jsonWebToken = require("jsonwebtoken");

module.exports = {
    checkPermission: (req, res, next) => {
        User.findById(res.locals.userId).then(user => {
            let permission = user.permission;
            if(permission === 'root') {
                next();
            }else {
                res.send({
                    message: "アップロードを行う権限がありません。"
                });
            }
        });
    },
    upload: (req, res, next) => {
        let data = req.body
        Member.create({
            ...data
        }).then(() => {
            Member.find({}).then(members => {
                res.send({
                    message: '正常にデータがアップロードされました。',
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