import { Queue, Worker } from 'bullmq';
import { PubSubManager } from './PubSubManager';
import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const connection = new Redis(process.env.REDIS_HOST!, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false, // Optional, depending on your needs
});

connection.on('connect', () => {
    console.log('Connected to Redis instance');
});

connection.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});


const subscribeQueue = new Queue('subscribeQueue', { connection });
const unsubscribeQueue = new Queue('unsubscribeQueue', { connection });
const publishQueue = new Queue('publishQueue', { connection });

const subscribeWorker = new Worker('subscribeQueue', async (job) => {
    const { gameId, userId, mode } = job.data;
    const instance = PubSubManager.getInstance();
    instance.subscribe(gameId, userId, mode);
    instance.broadcast(gameId);
}, { connection });

const unsubscribeWorker = new Worker('unsubscribeQueue', async (job) => {
    const { gameId, userId } = job.data;
    const instance = PubSubManager.getInstance();
    instance.unsubscribe(gameId, userId);
    instance.broadcast(gameId);
}, { connection });

const publishWorker = new Worker('publishQueue', async (job) => {
    const { gameId, userId } = job.data;
    const instance = PubSubManager.getInstance();
    instance.publish(gameId, userId);
}, { connection });

export { subscribeQueue, unsubscribeQueue, publishQueue };
