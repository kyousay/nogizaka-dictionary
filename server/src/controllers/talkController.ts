"use strict";

import Talk from "../models/talk";
import Member from "../models/member";
const getTalkRoomParams = (talkRoom: any,image: any) => {
    return {
        _id: talkRoom._id,
        roomName: talkRoom.roomName,
        description: talkRoom.description,
        isRock: talkRoom.isRock,
        image
    }
},
getParam = (data: any) => {
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

export = {
    getAllRooms: (req: any, res: any, next: any) => {
        Talk.find({}).populate("image").then(rooms => {
            if(rooms.length > 0) {
                let newRooms : any= [];
                rooms.forEach((room: any) => {
                    const image: any = room.image[0].image
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
    checkPassword: (req: any, res: any, next: any) => {
        const data = req.body;
        Talk.findById(data._id).populate("image").populate("chat").then((room: any) => {
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
    getRoom: (req: any, res: any, next: any) => {
        const room = res.locals.roomInfo;
        const newChat = room.chat.map((chat: any) => {
            const date = new Date(chat.createdAt)
            return {
                userId: chat.userId[0],
                userName: chat.userName,
                chat: chat.chat,
                date: `${date.getHours()}:${date.getMinutes()}`
            }
        })
        const returnData = {
            _id: room._id,
            roomName: room.roomName,
            description: room.description,
            image: room.image[0].image,
            chat: newChat
        };
        res.send({
            isSuccess: true,
            data: returnData
        });
    },
    createRoom: async (req: any, res: any, next: any) => {
        const data = await getParam(req.body)
        Talk.create(data).then(() => {
            Talk.find({}).populate("image").sort({'createdAt':-1}).limit(46).then(rooms => {
                let newRooms: any = []
                rooms.forEach((room: any) => {
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