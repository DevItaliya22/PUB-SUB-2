import { Server } from 'socket.io';
import { PubSubManager } from './PubSubManager';
import { publishQueue, subscribeQueue, unsubscribeQueue } from './queues';

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
    let gameID: string = ''; 
    socket.emit('welcome', { id: socket.id });

    socket.on('subscribe', (data) => {
      const { gameId, userId, mode } = data;
      gameID = gameId;
      socket.join(gameId);
      subscribeQueue.add('subscribe', { gameId, userId, mode });
    });

    socket.on('unsubscribe', (data) => {
      const { gameId, userId } = data;
      socket.leave(gameId);
      unsubscribeQueue.add('unsubscribe', { gameId, userId });
    });

    socket.on('publish', (data) => {
      const { gameId, userId } = data;
      publishQueue.add('publish', { gameId, userId });
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
