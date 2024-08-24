import { Server } from 'socket.io';
import { PubSubManager } from './PubSubManager';

export function setupWebSocket(server: any) {
  const io = new Server(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }});
  
  const instance = PubSubManager.getInstance();
  instance.setIo(io); 

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    let gameID: string = ''; // this will be the gameId of the game to which the player is connected

    // Send socket ID to client upon connection
    socket.emit('welcome', { id: socket.id });

    socket.on('subscribe', (data) => {
      const { gameId, userId, mode } = data;
      // console.log(data);
      gameID = gameId;
      socket.join(gameId); // Join the room for broadcasting
      instance.subscribe(gameId, userId, mode);
      instance.broadcast(gameId);
      console.log(`${userId} subscribed to game ${gameId}`);
    });

    socket.on('unsubscribe', (data) => {
      const { gameId, userId } = data;
      socket.leave(gameId); // Leave the room when unsubscribing
      instance.unsubscribe(gameId, userId);
      instance.broadcast(gameId);
      console.log(`${userId} unsubscribed from game ${gameId}`);
    });

    socket.on('publish', (data) => {
      const { gameId, userId } = data;
      instance.publish(gameId, userId);
      console.log(`${userId} incremented to game ${gameId}`);
      // instance.log();
    });

    socket.on('message', (message) => {
      console.log(`Received message from ${socket.id}: ${message}`);
    });

    socket.on('disconnect', () => {
      instance.unsubscribe(gameID, socket.id);
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
