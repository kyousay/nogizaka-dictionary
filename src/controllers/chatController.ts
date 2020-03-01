import Talk, { TalkDocument } from "../models/talk";
import Chat, { ChatDocument } from "../models/chat";
import * as soketio from 'socket.io'
import { MemberDocument } from "../models/member";

type postChatData = {
  userId: string
  userName: string
  chat: string,
  roomId: string
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
  checkTime = (time: number) => {
    if (time < 10) {
      const newTime = "0" + time;
      return newTime;
    }
    return time;
  },
  returnChatParam = (talk: TalkDocument) => {
    const chats  = (<ChatDocument[]>talk.chat);
    const chatsArray = chats.map((chat: any) => {
      const date = new Date(chat.createdAt);
      const returnDate = `${checkTime(date.getHours())}: ${checkTime(
        date.getMinutes()
      )}`;
      return {
        userId: chat.userId[0],
        userName: chat.userName,
        chat: chat.chat,
        date: returnDate
      };
    });
    return chatsArray;
  };

export = (io: soketio.Server) => {
  io.on("connection", client => {
    console.log("new connection");
    let usr = Object.keys(io.sockets.sockets).length;
    console.log(`now:${usr}`);

    let room = "";

    client.on("disconnect", () => {
      console.log("user disconnected");
      client.leave(room);
      console.log(`clientLeave: ${room}`);
      usr = Object.keys(io.sockets.sockets).length;
      console.log(`now:${usr}`);
    });

    client.on("joinRoom", (data: {data: string}) => {
      room = data.data;
      client.join(`${room}`);
      console.log(`clientJoin: ${room}`);
    });

    client.on("leaveRoom", () => {
      client.leave(`${room}`);
      console.log(`clientLeave: ${room}`);
    });

    client.on("newRoom", () => {
      Talk.find({})
        .populate("image")
        .sort({ createdAt: -1 })
        .limit(46)
        .then(newRooms => {
          const Rooms = newRooms.map(room => {
            return getTalkRoomParams(room, (<MemberDocument>room.image[0]).image);
          });
          client.broadcast.emit("createRoom", Rooms);
        });
    });

    client.on("chat", (data: postChatData) => {
      const chatData = {
        userId: data.userId,
        userName: data.userName,
        chat: data.chat
      };
      const roomId = data.roomId;
      Chat.create(chatData).then(newChat => {
        Talk.findByIdAndUpdate(roomId, {
          $addToSet: { chat: newChat._id }
        }).then(() => {
          Talk.findById(roomId)
            .populate("chat")
            .then(talk => {
              if(talk !== null) {
                const newValue = returnChatParam(talk);
                io.to(room).emit("return chat", {
                  content: newValue
                });
              }
            });
        });
      });
    });
  });
};
