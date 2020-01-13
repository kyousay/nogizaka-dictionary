"use strict";

const User = require("../models/user"),
Member = require("../models/member");

module.exports = {
    searchSegment: (req, res, next) => {
        const key = Object.keys(req.query)[0];
        const query = req.query[key];
        if(key === 'favorite'){
            User.findById(res.locals.userId).populate("favoriteMembers").then(user => {
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
    test: (req, res, next) => {
        const {word} = req.query;
        Member.find({}).then(members => {
            let result = [];
            members.forEach((member,index) => {
                const searchs = member.search;
                let isResult = false;
                console.log(searchs);
                console.log(index);
                searchs.forEach(search => {
                    if(isResult !== true){
                        if(Array.isArray(search)){
                            search.forEach(value => {
                                console.log(value, word, value===word);
                                if(value === word){
                                    isResult = true
                                }
                            });
                        } else {
                            console.log(search, word, search===word);
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
                    isResult: false
                })
            }
        });
    }
};