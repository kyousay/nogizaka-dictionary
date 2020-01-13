"use strict";

const User = require("../models/user"),
Member = require("../models/member"),
mongoose = require("mongoose");

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
        let memberId = req.body.memberId;
        Member.findByIdAndRemove(memberId).then(() => {
            User.find({}).then(users => {
                users.forEach(user => {
                    User.findByIdAndUpdate(user._id, {
                        $pull: { favoriteMembers: memberId }
                    },{new: true}, 
                    function(err, user){
                        if(err) console.log(err);
                        console.log(typeof res.locals.userId)
                        if(res.locals.userId == user._id) {
                            res.locals.userData = user;
                        }
                    });
                });
            });
            Member.find({}).then(members => {
                res.send({
                    message: 'メンバーデータの削除が正常に行われました。',
                    members,
                    user : {
                        favoriteMembers: res.locals.userData._doc.favoriteMembers
                    }
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