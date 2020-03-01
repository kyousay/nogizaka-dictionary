"use strict";

import Talk, { TalkDocument } from "../models/talk";
import Member, { MemberDocument } from "../models/member";
import { NextFunction, Request, Response } from "express";
import { ChatDocument } from "../models/chat";

type RoomState = {
  image?: string
  roomName: string
  description: string
  password: string
  isRock: boolean
}

const getTalkRoomParams = (talkRoom: TalkDocument, image: string) => {
    return {
      _id: talkRoom._id,
      roomName: talkRoom.roomName,
      description: talkRoom.description,
      isRock: talkRoom.isRock,
      image
    };
  },
  getParam = (data: RoomState) => {
    return new Promise(resolve => {
      if (!data.image) {
        Member.find({}).then(members => {
          const imageIndex = Math.floor(Math.random() * members.length);
          const imageId = members[imageIndex]._id;
          data.image = imageId;
          resolve(data);
        });
      } else {
        resolve(data);
      }
    });
  };

export = {
  getAllRooms: (req: Request, res: Response, next: NextFunction) => {
    Talk.find({})
      .populate("image")
      .then(rooms => {
        if (rooms.length > 0) {
          const newRooms: ReturnType<typeof getTalkRoomParams>[] = [];
          rooms.forEach((room) => {
            const image = (<MemberDocument>room.image[0]).image;
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
      })
      .catch(error => {
        res.send({
          isSuccess: false,
          message: `${error.name}: ${error.message}`
        });
      });
  },
  checkPassword: (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    Talk.findById(data._id)
      .populate("image")
      .populate("chat")
      .then(room => {
        if(room !== null) {
          if (room.isRock) {
            const roomPassword = room.password;
            if (roomPassword === data.password) {
              res.locals.roomInfo = room;
              next();
            } else {
              res.send({
                isSuccess: false,
                message: "パスワードが違います。"
              });
            }
          } else {
            res.locals.roomInfo = room;
            next();
          }
        } else {
          res.send({
            isSuccess: false,
            message: "エラーが発生しました。お手数ですが、時間が経ってから再度試してみてください。"
          });
        } 
      })
  },
  getRoom: (req: Request, res: Response, next: NextFunction) => {
    const room: TalkDocument = res.locals.roomInfo;
    const newChat = (<ChatDocument[]>room.chat).map(chat => {
      const date = new Date(chat.createdAt);
      return {
        userId: chat.userId[0],
        userName: chat.userName,
        chat: chat.chat,
        date: `${date.getHours()}:${date.getMinutes()}`
      };
    });
    const returnData = {
      _id: room._id,
      roomName: room.roomName,
      description: room.description,
      image: (<MemberDocument>room.image[0]).image,
      chat: newChat
    };
    res.send({
      isSuccess: true,
      data: returnData
    });
  },
  createRoom: async (req: Request, res: Response) => {
    const data = await getParam(req.body);
    Talk.create(data)
      .then(() => {
        Talk.find({})
          .populate("image")
          .sort({ createdAt: -1 })
          .limit(46)
          .then(rooms => {
            const newRooms: ReturnType<typeof getTalkRoomParams>[] = [];
            rooms.forEach(room => {
              const image = (<MemberDocument>room.image[0]).image;
              const newRoom = getTalkRoomParams(room, image);
              newRooms.push(newRoom);
            });
            res.send({
              isSuccess: true,
              data: newRooms
            });
          })
          .catch(error => {
            res.send({
              isSuccess: false,
              message: `${error.name}: ${error.message}`
            });
          });
      })
      .catch(error => {
        res.send({
          isSuccess: false,
          message: `${error.name}: ${error.message}`
        });
      });
  }
};
