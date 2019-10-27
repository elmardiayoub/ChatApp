var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

server.listen(PORT, function() {
  console.log('Chat server running');
});

var io = require('socket.io')(server);

const users = {}
io.on('connection',socket=>{
    //socket.emit('chat-message','Hello');
    socket.on('new-user',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name);
    });
    socket.on('send-chat-message',message => {
        socket.broadcast.emit('chat-message',{message : message, name:users[socket.id]});
    });
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
    });
});
