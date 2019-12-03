"use strict";

const User = require("../models/user"),
    passport = require("passport"),
    jsonWebToken = require("jsonwebtoken"),
    getUserParams = body => {
        return {
            email: body.email,
            password: body.password
        }
    }

module.exports = {
    create: (req, res, next) => {
        let newUser = new User(getUserParams(req.body));
        console.log(req.body.password)
        User.register(newUser, req.body.password, (e, user) => {
            if(user) {
                console.log(user)
                res.send("ユーザーが新規に登録されました。ログインしてください。")
            }else{
                console.log(e);
                res.send(`${e.name}: ${e.message}`)
            }
        })
    },
    login: (req, res, next) => {
        passport.authenticate("local", (err, user) => {
            if(user) {
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Data().setData(new Data().getData() + 1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({
                    success: true,
                    message: "ログインに成功しました。",
                    token: signedToken,
                    user: user,
                });
            } else {
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
        }
        })(req, res, next);
    },
    
}