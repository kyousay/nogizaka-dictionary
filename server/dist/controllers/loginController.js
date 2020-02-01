"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var user_1 = __importDefault(require("../models/user"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var getUserParams = function (body) {
    return {
        email: body.email,
        password: body.password
    };
}, getUserData = function (data) {
    return {
        userId: data._id,
        permission: data.permission,
        favoriteMembers: data.favoriteMembers,
        nickName: data.nickName,
        message: data.message,
        rank: data.rank
    };
};
module.exports = {
    create: function (req, res, next) {
        var newUser = getUserParams(req.body);
        user_1.default.create(newUser).then(function (user) {
            if (user) {
                res.send("ユーザーが新規に登録されました。ログインしてください。");
            }
        }).catch(function (error) {
            res.send("Error:" + error.message);
        });
    },
    login: function (req, res, next) {
        user_1.default.findOne({ email: req.body.email }).then(function (user) {
            if (user) {
                user.passwordComparison(req.body.password).then(function (passwordsMatch) {
                    if (passwordsMatch) {
                        var signedToken = jsonwebtoken_1.default.sign({
                            data: user._id,
                            exp: new Date().setDate(new Date().getDate() + 1)
                        }, "effort_thanks_smile");
                        var userData = getUserData(user);
                        res.json({
                            success: true,
                            token: signedToken,
                            user: userData,
                            message: "ログインに成功しました。"
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: "ログインに失敗しました。パスワードが異なっています。"
                        });
                    }
                });
            }
            else {
                res.json({
                    success: false,
                    message: "ログインに失敗しました。アカウントがありません。メールアドレスを確認してください。"
                });
            }
        }).catch(function (error) {
            console.log("Error loggin in user: " + error.message);
            next(error);
        });
    },
    verifyJWT: function (req, res, next) {
        var token = req.headers.authorization;
        if (token) {
            jsonwebtoken_1.default.verify(token, "effort_thanks_smile", function (error, payload) {
                if (payload) {
                    user_1.default.findById(payload.data).then(function (user) {
                        res.locals.userId = payload.data;
                        if (user) {
                            next();
                        }
                        else {
                            res.json({
                                error: true,
                                message: "ユーザーが見つかりません。新しくアカウントを作成するか、パスワードのリセットをお願いします。"
                            });
                        }
                    });
                }
                else {
                    res.json({
                        error: true,
                        message: "正しく認証が行えませんでした。恐れ入りますが、ログインからやり直してください。"
                    });
                    next();
                }
            });
        }
        else {
            res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                error: true,
                message: "Provide Token"
            });
        }
    },
};
