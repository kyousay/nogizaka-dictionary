const Talk = require("../models/talk"),
Chat = require("../models/chat"),
getTalkRoomParams = (talkRoom, image) => {
    return {
        _id: talkRoom._id,
        roomName: talkRoom.roomName,
        description: talkRoom.description,
        isRock: talkRoom.isRock,
        image
    }
},
returnChatParam = (talk) => {
    const chats = talk.chat;
    let chatsArray = chats.map(chat => {
        const date = new Date(chat.createdAt);
        const returnDate = `${checkTime(date.getHours())}: ${checkTime(date.getMinutes())}`
        return {
            userId: chat.userId[0],
            userName: chat.userName,
            chat: chat.chat,
            date: returnDate
        }
    });
    return chatsArray;
},
checkTime = (time) => {
    if(time < 10) {
        const newTime = '0' + time;
        return newTime
    }
    return time
};

module.exports = io => {
    io.on("connection", client => {

        console.log("new connection");
        let usr = Object.keys(io.sockets.sockets).length
        console.log(`now:${usr}`)

        let room = ''
        
        client.on("disconnect",() => {
            console.log("user disconnected");
            client.leave(room);
            console.log(`clientLeave: ${room}`)
            usr = Object.keys(io.sockets.sockets).length;
            console.log(`now:${usr}`);
        });

        client.on("joinRoom", data => {
            room = data.data;
            client.join(`${room}`)
            console.log(`clientJoin: ${room}`)
        })

        client.on("leaveRoom", () => {
            client.leave(`${room}`)
            console.log(`clientLeave: ${room}`)
        })

        client.on("newRoom", () => {
            Talk.find({}).populate("image").sort({'createdAt':-1}).limit(46).then(newRooms => {
                let Rooms = newRooms.map(room => {
                    return getTalkRoomParams(room, room.image[0].image)
                });
                client.broadcast.emit("createRoom", Rooms);
            })
        })

        client.on("chat", data => {
            const chatData = {
                userId: data.userId,
                userName: data.userName,
                chat: data.chat
            }
            const roomId = data.roomId
            Chat.create(chatData).then(newChat => {
                Talk.findByIdAndUpdate(roomId, {
                    $addToSet: {chat: newChat._id}
                }).then(() => {
                    Talk.findById(roomId).populate("chat").then(talk => {
                        const newValue = returnChatParam(talk);
                        io.to(room).emit('return chat', {
                            content: newValue
                        });
                    });
                })
            })
        });
    });
}