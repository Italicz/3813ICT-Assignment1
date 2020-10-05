module.exports = {
  connect: function(io, PORT, db) {
    var socketRoom = [];
    var rooms = [];
    //Access channels collection
    const collection = db.collection('channels');
    //Find all channels
    collection.find({}).toArray((err, data) => {
      if(err) {
        throw err;
      }
      for (let i=0; i < data.length; i++) {
        rooms.push(data[i].name)
      }
    });

    const chat = io.of('/chat');

    chat.on('connection', (socket) => {
      //Connection
      console.log("User connection on port " + PORT + ": " + socket.id);
      socket.on('message', (message) => {
        console.log(message);
        for (i=0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            console.log('im emitting it');
            chat.to(socketRoom[i][1]).emit('message', message);
          }
        }
      });

      socket.on('joinRoom', (data) => {
        //Join room
        if (rooms.includes(data.room)) {
          socket.join(data.room, () => {
            var inroomSocketArray = false;
            for (i=0; i < socketRoom.length; i++) {
              if (socketRoom[i][0] == socket.id) {
                socketRoom[i][1] == data.room;
              }
            }
            if (inroomSocketArray == false) {
              socketRoom.push([socket.id, data.room]);
            }
            chat.in(data.room).emit('notice', data.username + " has joined the chat.")
          });
          return chat.in(data.room).emit("joined", data.room);
        }
      });

      socket.on('leaveRoom', (data) => {
        //Leave room
        for (let i=0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            socketRoom.splice(i, 1);
            socket.leave(data.room);
            chat.to(data.room).emit('notice', data.username + " has left the chat.");
          }
        }
      });

      socket.on('disconnect', () => {
        //Disconnect
        for (let i=0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            socketRoom.splice(i, 1);
          }
        }
        console.log("Someone has disconnected.")
      });

    });

  }
}