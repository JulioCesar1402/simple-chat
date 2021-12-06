const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  // console.log('a user connected');

  // socket.on('disconnect', () => {
  //   console.log('user disconnect');
  // });

  const channel = 'chatMessage';

  socket.broadcast.emit(channel, 'a user connected');

  socket.on('disconnect', () => {
    io.emit(channel, 'a user disconnect');
  });

  socket.on(channel, (msg) => {
    // console.log(`message: ${msg}`);
    io.emit(channel, msg);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
