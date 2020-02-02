"use strict";

import User, { UserDocument } from "../models/user";
import Member, { MemberDocument } from "../models/member";
import { Request, Response, NextFunction } from "express";

export = {
  searchSegment: (req: Request, res: Response, next: NextFunction) => {
    const key = Object.keys(req.query)[0];
    const query = req.query[key];
    if (key === "favorite") {
      User.findById(res.locals.userId)
        .populate("favoriteMembers")
        .then(user => {
          if(user !== null) {
            res.send({ members: user.favoriteMembers });
          }
        });
    } else if (key === "members") {
      Member.find({}).then(members => {
        res.send({ members });
      });
    } else {
      Member.find({ segment: query }).then(members => {
        res.send({ members });
      });
    }
  },
  searchFreeword: (req: Request, res: Response, next: NextFunction) => {
    const { word } = req.query;
    Member.find({}).then(members => {
      const result: MemberDocument[] = [];
      members.forEach((member: MemberDocument, index: number) => {
        const searchs = member.search;
        let isResult = false;
        searchs.forEach(search => {
          if (isResult !== true) {
            if (Array.isArray(search)) {
              search.forEach(value => {
                if (value === word) {
                  isResult = true;
                }
              });
            } else {
              isResult = search == word;
            }
          }
        });
        if (isResult) {
          result.push(member);
        }
      });
      if (result.length > 0) {
        res.send({
          isResult: true,
          result
        });
      } else {
        res.send({
          isResult: false,
          result: []
        });
      }
    });
  }
};
