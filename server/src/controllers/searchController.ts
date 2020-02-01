"use strict";

import User from "../models/user";
import Member from "../models/member";

export = {
    searchSegment: (req: any, res: any, next: any) => {
        const key = Object.keys(req.query)[0];
        const query = req.query[key];
        if(key === 'favorite'){
            User.findById(res.locals.userId).populate("favoriteMembers").then((user: any) => {
                res.send({members: user.favoriteMembers})
            })
        } else if(key === 'members') {
            Member.find({}).then(members => {
                res.send({members});
            })
        } else {
            Member.find({segment:query}).then(members => {
                res.send({members});
            })
        }
    },
    test: (req: any, res: any, next: any) => {
        const {word} = req.query;
        Member.find({}).then(members => {
            let result: any = [];
            members.forEach((member: any,index: any) => {
                const searchs = member.search;
                let isResult = false;
                searchs.forEach((search: any) => {
                    if(isResult !== true){
                        if(Array.isArray(search)){
                            search.forEach(value => {
                                if(value === word){
                                    isResult = true
                                }
                            });
                        } else {
                            isResult = search == word;
                        }
                    }
                });
                if(isResult) {
                    result.push(member);
                }
            });
            if(result.length > 0) {
                res.send({
                    isResult: true,
                    result
                });
            } else {
                res.send({
                    isResult: false,
                    result: []
                })
            }
        });
    }
};