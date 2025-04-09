// Node sever which will handle socket io connections

const io=require('socket.io')(8001, {
    cors: {
        origin: "http://127.0.0.1:5500", // allows your client application to communicate with the Socket.IO server.
        methods: ["GET", "POST"]
      }
});
const users={};
io.on('connection', socket =>{ 
    //when a new user joins                   
    socket.on('new-user-joined',name=>{
        // console.log("new user:",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    //when user sends a msg

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 
})                   
