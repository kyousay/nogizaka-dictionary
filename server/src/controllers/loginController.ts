"use strict";

import User, { UserDocument } from "../models/user";
import httpStatus from "http-status-codes";
import jsonWebToken from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

type userLoginData = {
  email: string
  password: string
}

const getUserParams = (body: userLoginData) => {
    return {
      email: body.email,
      password: body.password
    };
  },
  getUserData = (data: UserDocument) => {
    return {
      userId: data._id,
      permission: data.permission,
      favoriteMembers: data.favoriteMembers,
      nickName: data.nickName,
      message: data.message,
      rank: data.rank
    };
  };

export = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const newUser = getUserParams(req.body);
    User.create(newUser)
      .then(user => {
        if (user) {
          res.send("ユーザーが新規に登録されました。ログインしてください。");
        }
      })
      .catch(error => {
        res.send(`Error:${error.message}`);
      });
  },
  login: (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          user
            .passwordComparison(req.body.password)
            .then(passwordsMatch => {
              if (passwordsMatch) {
                const signedToken = jsonWebToken.sign(
                  {
                    data: user._id,
                    exp: new Date().setDate(new Date().getDate() + 1)
                  },
                  "effort_thanks_smile"
                );
                const userData = getUserData(user);
                res.json({
                  success: true,
                  token: signedToken,
                  user: userData,
                  message: "ログインに成功しました。"
                });
              } else {
                res.json({
                  success: false,
                  message:
                    "ログインに失敗しました。パスワードが異なっています。"
                });
              }
            });
        } else {
          res.json({
            success: false,
            message:
              "ログインに失敗しました。アカウントがありません。メールアドレスを確認してください。"
          });
        }
      })
      .catch(error => {
        console.log(`Error loggin in user: ${error.message}`);
        next(error);
      });
  },
  verifyJWT: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
      jsonWebToken.verify(
        token,
        "effort_thanks_smile",
        (error, payload) => {
          if (payload) {
            User.findById((<{data:string}>payload).data).then(user => {
              res.locals.userId = (<{data:string}>payload).data;
              if (user) {
                next();
              } else {
                res.json({
                  error: true,
                  message:
                    "ユーザーが見つかりません。新しくアカウントを作成するか、パスワードのリセットをお願いします。"
                });
              }
            });
          } else {
            res.json({
              error: true,
              message:
                "正しく認証が行えませんでした。恐れ入りますが、ログインからやり直してください。"
            });
            next();
          }
        }
      );
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: true,
        message: "Provide Token"
      });
    }
  }
};
