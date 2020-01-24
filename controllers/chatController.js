const Talk = require("../models/talk"),
Chat = require("../models/chat"),
returnChatParam = (talk) => {
    const chats = talk.chat;
    let chatsArray = chats.map(chat => {
        const date = new Date(chat.createdAt);
        const returnDate = `${date.getHours()}:${date.getMinutes()}`
        return {
            userName: chat.userName,
            chat: chat.chat,
            date: returnDate
        }
    });
    return chatsArray.reverse();
};

module.exports = io => {
    io.on("connection", client => {
        console.log("new connection");
        
        client.on("disconnect",() => {
            console.log("user disconnected");
        });

        client.on("chat", data => {
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
                        const newValue = returnChatParam(talk);
                        client.emit('return chat', {
                            content: newValue
                        });
                    });
                })
            })
        });
    });
}