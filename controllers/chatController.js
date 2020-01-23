const Talk = require("../models/talk"),
Chat = require("../models/chat");

module.exports = io => {
    io.on("connection", client => {
        console.log("new connection");
        
        client.on("disconnect",() => {
            console.log("user disconnected");
        });

        client.on("message", data => {
            console.log(data)
            const chatData = {
                userName: data.userName,
                chat: data.chat
            }
            const roomId = data.roomId
            Chat.create(chatData).then(newChat => {
                Talk.findByIdAndUpdate(roomId, {
                    $addToSet: {chat: newChat._id}
                }).then(() => {
                    Talk.findById(roomId).populate("chat").then(talk => {
                        io.emit('message', {
                            content: talk.chat
                        });
                    });
                })
            })
        });
    });
}