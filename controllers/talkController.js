"use strict";

const Talk = require("../models/talk"),
Member = require("../models/member"),
getTalkRoomParams = (talkRoom,image) => {
    return {
        _id: talkRoom._id,
        roomName: talkRoom.roomName,
        description: talkRoom.description,
        isRock: talkRoom.isRock,
        image
    }
},
getParam = (data) => {
    return new Promise(resolve => {
        if(!data.image) {
            Member.find({}).then(members => {
                const imageIndex = Math.floor(Math.random() * members.length);
                const imageId = members[imageIndex]._id;
                data.image = imageId;
                resolve(data);
            });
        } else {
            resolve(data);
        }
    })
};

module.exports = {
    getAllRooms: (req, res, next) => {
        Talk.find({}).populate("image").then(rooms => {
            if(rooms.length > 0) {
                let newRooms = [];
                rooms.forEach(room => {
                    const image = room.image[0].image
                    const newRoom = getTalkRoomParams(room, image);
                    newRooms.unshift(newRoom);
                });
                res.send({
                    isSuccess: true,
                    data: newRooms
                });
            } else {
                res.send({
                    isSuccess: true,
                    data: rooms
                });
            }
        }).catch(error => {
            res.send({
                isSuccess: false,
                message:`${error.name}: ${error.message}`
            })
        });
    },
    checkPassword: (req, res, next) => {
        const data = req.body;
        Talk.findById(data._id).populate("image").populate("talk").then(room => {
            if(room.isRock) {
                const roomPassword = room.password;
                if(roomPassword === data.password) {
                    res.locals.roomInfo = room;
                    next();
                } else {
                    res.send({
                        isSuccess: false,
                        message: 'パスワードが違います。'
                    });
                }
            } else {
                res.locals.roomInfo = room;
                next();
            }
        });
    },
    getRoom: (req, res, next) => {
        const room = res.locals.roomInfo; 
        const returnData = {
            _id: room._id,
            roomName: room.roomName,
            description: room.description,
            image: room.image[0].image,
            chat: room.chat
        };
        res.send({
            isSuccess: true,
            data: returnData
        });
    },
    createRoom: async (req, res, next) => {
        const data = await getParam(req.body)
        Talk.create(data).then(() => {
            Talk.find({}).populate("image").then(rooms => {
                let newRooms = []
                rooms.forEach(room => {
                    const image = room.image[0].image
                    const newRoom = getTalkRoomParams(room, image);
                    newRooms.push(newRoom);
                });
                res.send({
                    isSuccess: true,
                    data: newRooms
                });
            }).catch(error => {
                res.send({
                    isSuccess: false,
                    message:`${error.name}: ${error.message}`
                });
            })
        }).catch(error => {
            res.send({
                isSuccess: false,
                message: `${error.name}: ${error.message}`
            });
        })
    }
};