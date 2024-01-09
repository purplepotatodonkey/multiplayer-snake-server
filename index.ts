const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//https://socket.io/get-started/chat

//we probably want to have methods for when a player starts a game, we want to create a new room for them.
//the room will hold the game state and the players in the game. it'll broadcast the game state to all players in the room.
io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});