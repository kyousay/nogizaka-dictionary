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
                    next(room);
                } else {
                    res.send({
                        isSuccess: false,
                        message: 'パスワードが違います。'
                    });
                }
            } else {
                next(room);
            }
        });
    },
    getRoom: (room, req, res, next) => {
        console.log(room);
        const returnData = {
            _id: room._id,
            roomName: room.roomName,
            description: room.description,
            image: room.image[0].image,

        }
        res.send({
            isSuccess: true,
            data: returnData
        });
    },
    createRoom: (req, res, next) => {
        Talk.create(req.body).then(() => {
            Talk.find({}).populate("image").then(rooms => {
                Member.find({}).then(members => {
                    let newRooms = []
                    rooms.forEach(room => {
                        if(room.image.length > 0) {
                            const image = room.image[0].image
                            const newRoom = getTalkRoomParams(room, image);
                            newRooms.push(newRoom);
                        } else {
                            const imageIndex = Math.floor(Math.random() * members.length);
                            const image = members[imageIndex].image;
                            const newRoom = getTalkRoomParams(room, image);
                            newRooms.push(newRoom);
                        }
                    });
                    res.send({
                        isSuccess: true,
                        data: newRooms
                    });
                })
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