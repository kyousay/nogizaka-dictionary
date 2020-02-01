"use strict";

import User from "../models/user";

const getUserData = (data: any) => {
    return {
        permission: data.permission,
        favoriteMembers: data.favoriteMembers,
        nickName: data.nickName,
        message: data.message,
        rank: data.rank
    }
};

export = {
    update: (req: any, res: any, next: any) => {
        let userParams = {
            nickName: req.body.nickName,
            message: req.body.message,
            rank: req.body.rank
        }
        User.findByIdAndUpdate(res.locals.userId,{
            $set: userParams
        })
        .then(() => {
            res.send(req.body);
        })
        .catch(error => {
            next(error);
        })
    },
    favorite: (req: any, res: any, next: any) => {
        let favoriteId = req.body.id
        User.findByIdAndUpdate(res.locals.userId, {
                $addToSet: { favoriteMembers: favoriteId }
        },
        {new: true}
        ).then(user => {
            const userData = getUserData(user);
            res.send(userData);
        });
    },
    unfavorite: (req: any, res: any, next: any) => {
        let favoriteId = req.body.id
        User.findByIdAndUpdate(res.locals.userId, {
                $pull: { favoriteMembers: favoriteId }
        },
        {new: true}).then(user => {
            const userData = getUserData(user);
            res.send(userData);
        });
    }
};