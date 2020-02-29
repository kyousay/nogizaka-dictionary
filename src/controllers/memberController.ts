"use strict";

import User from "../models/user";
import Member from "../models/member";
import { Request, Response, NextFunction } from "express";

export = {
  checkPermission: (req: Request, res: Response, next: NextFunction) => {
    User.findById(res.locals.userId).then(user => {
      if(user !== null) {
        const permission = user.permission;
        if (permission === "root") {
          next();
        } else {
          res.send({
            message: "アップロードを行う権限がありません。"
          });
        }
      }
    });
  },
  upload: (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    Member.create({
      ...data
    })
      .then(() => {
        Member.find({}).then(members => {
          res.send({
            message: "正常にデータがアップロードされました。",
            members
          });
        });
      })
      .catch(error => {
        next(error);
      });
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    const memberId = req.body._id;
    Member.findByIdAndUpdate(memberId, {
      $set: req.body
    })
      .then(() => {
        Member.find({}).then(members => {
          res.send({
            message: "正常にデータが正常にアップデートされました。",
            members
          });
        });
      })
      .catch(error => {
        next(error);
      });
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    const memberId = req.body.memberId;
    Member.findByIdAndRemove(memberId).then(() => {
      User.find({}).then(users => {
        users.forEach(user => {
          User.findByIdAndUpdate(
            user._id,
            {
              $pull: { favoriteMembers: memberId }
            },
            { new: true }
          ).then(user => {
            if(user !== null) {
              if (res.locals.userId == user._id) {
                Member.find({}).then(members => {
                  res.send({
                    message: "メンバーデータの削除が正常に行われました。",
                    members,
                    user: {
                      favoriteMembers: user.favoriteMembers
                    }
                  });
                });
              }
            }
          });
        });
      });
    });
  },
  getAllMembers: (req: Request, res: Response, next: NextFunction) => {
    Member.find({})
      .then(members => {
        res.send({
          members
        });
      })
      .catch(error => {
        next(error);
      });
  }
};
