const { Socket } = require("socket.io");

module.exports = [
  (io) => {
    io.on('connection', async (socket) => {
      console.log(socket.id);
    }); 
  }
];