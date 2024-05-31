const express=require('express')
const app=express();
const http=require('http');
const path=require('path');
const server=http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use('/', express.static(path.join(__dirname, 'public')));

const users={};

io.on('connection',(socket)=>{
socket.on('send-msg',(data)=>{
  
    io.emit('received-msg',{msg:data.msg,username:users[socket.id]})
})
socket.on('login', (data) => {
    users[socket.id] = data.username;
});

})

io.on('disconnect', (socket) => {
    console.log(`client with socket id ${socket.id} got disconnected`)
});





const port=process.env.PORT||3000
server.listen(port,()=>{
    console.log(`server running at port ${port} `)
})