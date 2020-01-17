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
                        result: true,
                        data: newRooms
                    });
                })
            }).catch(error => {
                res.send({
                    result: false,
                    message:`${error.name}: ${error.message}`
                });
            })
        }).catch(error => {
            res.send({
                result: false,
                message: `${error.name}: ${error.message}`
            });
        })
    }
};