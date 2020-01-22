const Talk = require("../models/talk"),
Chat = require("../models/chat");

module.exports = io => {
    io.on("connection", client => {
        console.log("new connection");
        
        client.on("disconnect",() => {
            console.log("user disconnected");
        });

        client.on("message", data => {
            console.log(data);
            // Chat.create(data).then(chat => {

            // })
            io.emit('message', {
                content: 'Hello'
            });
        });
    });
}