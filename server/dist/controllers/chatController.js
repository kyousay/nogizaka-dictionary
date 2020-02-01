"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var talk_1 = __importDefault(require("../models/talk"));
var chat_1 = __importDefault(require("../models/chat"));
var getTalkRoomParams = function (talkRoom, image) {
    return {
        _id: talkRoom._id,
        roomName: talkRoom.roomName,
        description: talkRoom.description,
        isRock: talkRoom.isRock,
        image: image
    };
}, returnChatParam = function (talk) {
    var chats = talk.chat;
    var chatsArray = chats.map(function (chat) {
        var date = new Date(chat.createdAt);
        var returnDate = checkTime(date.getHours()) + ": " + checkTime(date.getMinutes());
        return {
            userId: chat.userId[0],
            userName: chat.userName,
            chat: chat.chat,
            date: returnDate
        };
    });
    return chatsArray;
}, checkTime = function (time) {
    if (time < 10) {
        var newTime = '0' + time;
        return newTime;
    }
    return time;
};
module.exports = function (io) {
    io.on("connection", function (client) {
        console.log("new connection");
        var usr = Object.keys(io.sockets.sockets).length;
        console.log("now:" + usr);
        var room = '';
        client.on("disconnect", function () {
            console.log("user disconnected");
            client.leave(room);
            console.log("clientLeave: " + room);
            usr = Object.keys(io.sockets.sockets).length;
            console.log("now:" + usr);
        });
        client.on("joinRoom", function (data) {
            room = data.data;
            client.join("" + room);
            console.log("clientJoin: " + room);
        });
        client.on("leaveRoom", function () {
            client.leave("" + room);
            console.log("clientLeave: " + room);
        });
        client.on("newRoom", function () {
            talk_1.default.find({}).populate("image").sort({ 'createdAt': -1 }).limit(46).then(function (newRooms) {
                var Rooms = newRooms.map(function (room) {
                    return getTalkRoomParams(room, room.image[0].image);
                });
                client.broadcast.emit("createRoom", Rooms);
            });
        });
        client.on("chat", function (data) {
            var chatData = {
                userId: data.userId,
                userName: data.userName,
                chat: data.chat
            };
            var roomId = data.roomId;
            chat_1.default.create(chatData).then(function (newChat) {
                talk_1.default.findByIdAndUpdate(roomId, {
                    $addToSet: { chat: newChat._id }
                }).then(function () {
                    talk_1.default.findById(roomId).populate("chat").then(function (talk) {
                        var newValue = returnChatParam(talk);
                        io.to(room).emit('return chat', {
                            content: newValue
                        });
                    });
                });
            });
        });
    });
};
