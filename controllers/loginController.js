"use strict";

const User = require("../models/user"),
    passport = require("passport"),
    httpStatus = require("http-status-codes"),
    jsonWebToken = require("jsonwebtoken"),
    getUserParams = body => {
        return {
            email: body.email,
            password: body.password
        }
    };

module.exports = {
    create: (req, res, next) => {
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (e, user) => {
            if(user) {
                res.send("ユーザーが新規に登録されました。ログインしてください。")
            }else{
                res.send(`${e.name}: ${e.message}`)
            }
        })
    },
    login: (req, res, next) => {
        passport.authenticate("local", (errors, user) => {
            if(user) {
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "effort_thanks_smile"
                );
                res.json({
                    success: true,
                    token: signedToken,
                    user: {
                        permission: user.permission,
                        id: user._id,
                        nickName: user.nickName,
                        message: user.message,
                        rank: user.rank
                    },
                    message: "ユーザー認証に成功しました。"
                });
            } else {
                res.json({
                    success: false,
                    message: "ユーザー認証に失敗しました。"
                });
            }
        })(req, res, next);
    },
    verifyJWT: (req, res, next) => {
        let token = req.headers.authorization;
        if(token) {
            jsonWebToken.verify(token, "effort_thanks_smile", (error, payload) => {
                if(payload) {
                    User.findById(payload.data).then(user => {
                        if(user) {
                            next();
                        } else {
                            res.status(httpStatus.FORBIDDEN).json({
                                error: true,
                                message: "ユーザーが見つかりません。新しくアカウントを作成するか、パスワードのリセットをお願いします。"
                            });
                        }
                    });
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
                message: "Provide Token"
            });
        }
    },
    test: (req, res, next) => {
        res.send("testクリア");
    }
};