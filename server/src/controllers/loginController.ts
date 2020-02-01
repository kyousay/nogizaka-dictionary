"use strict";

import User from "../models/user";
import httpStatus from "http-status-codes";
import jsonWebToken from "jsonwebtoken";
const getUserParams = (body: any) => {
        return {
            email: body.email,
            password: body.password
        }
    },
    getUserData = (data: any) => {
        return {
            userId: data._id,
            permission: data.permission,
            favoriteMembers: data.favoriteMembers,
            nickName: data.nickName,
            message: data.message,
            rank: data.rank
        }
    };

export = {
    create: (req: any, res: any, next: any) => {
        let newUser = getUserParams(req.body);
        User.create(newUser).then((user: any) => {
            if(user) {
                res.send("ユーザーが新規に登録されました。ログインしてください。")
            }
        }).catch(error => {
            res.send(`Error:${error.message}`)
        })
            
    },
    login: (req: any, res: any, next: any) => {
        User.findOne({email: req.body.email}).then((user: any) => {
            if(user) {
                user.passwordComparison(req.body.password).then((passwordsMatch: any) => {
                    if(passwordsMatch) {
                        let signedToken = jsonWebToken.sign(
                            {
                                data: user._id,
                                exp: new Date().setDate(new Date().getDate() + 1)
                            },
                            "effort_thanks_smile"
                        );
                        const userData = getUserData(user)
                        res.json({
                            success: true,
                            token: signedToken,
                            user: userData,
                            message: "ログインに成功しました。"
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "ログインに失敗しました。パスワードが異なっています。"
                        });
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: "ログインに失敗しました。アカウントがありません。メールアドレスを確認してください。"
                });
            }
        }).catch(error => {
            console.log(`Error loggin in user: ${error.message}`);
            next(error);
        });
    },
    verifyJWT: (req: any, res: any, next: any) => {
        let token = req.headers.authorization;
        if(token) {
            jsonWebToken.verify(token, "effort_thanks_smile", (error: any, payload: any) => {
                if(payload) {
                    User.findById(payload.data).then(user => {
                        res.locals.userId = payload.data
                        if(user) {
                            next();
                        } else {
                            res.json({
                                error: true,
                                message: "ユーザーが見つかりません。新しくアカウントを作成するか、パスワードのリセットをお願いします。"
                            });
                        }
                    });
                } else {
                    res.json({
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
};