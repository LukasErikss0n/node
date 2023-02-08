const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const db = require("./server-con")

app.use(express.static('public'))



let counter = 1

io.on('connection', (socket) => {
  console.log('a user connected');
  counter += 1

  socket.on('chat message', async (msg) => {
    let socketId = socket.id
    let nickname = 'Guest' + counter
    let listOfAnswers = await db.answers(msg)
    answer = ""
  
    io.to(socketId).emit('chat message', nickname + ": " + msg);
    if (listOfAnswers.length) {
      answer = listOfAnswers[0].output
      txt = 'Chatt Bott: ' + answer
      io.to(socketId).emit('chat message', txt)
    }
    else {
      answer = "Jag förstår inte :("
      txt = 'Chatt Bott: ' + answer
      io.to(socketId).emit('chat message', txt)
    }
    
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});