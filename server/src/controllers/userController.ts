"use strict";

import User, { UserDocument } from "../models/user";
import { Request, Response, NextFunction } from "express";

const getUserData = (
  data: UserDocument
): Pick<
  UserDocument,
  "permission" | "favoriteMembers" | "nickName" | "message" | "rank"
> => {
  return {
    permission: data.permission,
    favoriteMembers: data.favoriteMembers,
    nickName: data.nickName,
    message: data.message,
    rank: data.rank
  };
};

export = {
  update: (req: Request, res: Response, next: NextFunction) => {
    const userParams = {
      nickName: req.body.nickName,
      message: req.body.message,
      rank: req.body.rank
    };
    User.findByIdAndUpdate(res.locals.userId, {
      $set: userParams
    })
      .then(() => {
        res.send(req.body);
      })
      .catch(error => {
        next(error);
      });
  },
  favorite: (req: Request, res: Response, next: NextFunction) => {
    const favoriteId = req.body.id;
    User.findByIdAndUpdate(
      res.locals.userId,
      {
        $addToSet: { favoriteMembers: favoriteId }
      },
      { new: true }
    ).then(user => {
      let userData = {};
      if (user) {
        userData = getUserData(user);
      }
      res.send(userData);
    });
  },
  unfavorite: (req: Request, res: Response, next: NextFunction) => {
    const favoriteId = req.body.id;
    User.findByIdAndUpdate(
      res.locals.userId,
      {
        $pull: { favoriteMembers: favoriteId }
      },
      { new: true }
    ).then(user => {
      let userData = {};
      if (user) {
        userData = getUserData(user);
      }
      res.send(userData);
    });
  }
};
