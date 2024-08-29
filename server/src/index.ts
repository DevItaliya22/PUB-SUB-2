import express from 'express';
import cors from 'cors';
import http from 'http';
import { setupWebSocket } from './websocket';
import dotenv from 'dotenv';
dotenv.config();

//LOAD ENV FILE LIKE THIS

//FOR LOCALHOST
// REDIS_PUBSUB_HOST=redis://localhost:6379
// REDIS_PORT=6379
// PORT=3000
// REDIS_HOST=localhost
// NODE_ENV=development


//FOR DOCKER-COMPOSE UP 
// REDIS_PUBSUB_HOST=redis://redis:6379
// REDIS_PORT=6379
// PORT=3000
// REDIS_HOST=redis
// NODE_ENV=development



const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Express server is running');
});

// Setup WebSocket server
setupWebSocket(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
