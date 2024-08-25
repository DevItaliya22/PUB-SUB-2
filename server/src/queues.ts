import {  Queue, Worker   } from 'bullmq';
import { PubSubManager } from './PubSubManager';

const instance = PubSubManager.getInstance();
const connection = {
    port: 6379,
    host:'redis',
};

const subscribeQueue = new Queue('subscribeQueue', { connection });
const unsubscribeQueue = new Queue('unsubscribeQueue', { connection });
const publishQueue = new Queue('publishQueue', { connection });

const subscribeWorker = new Worker('subscribeQueue', async (job) => {
    const { gameId, userId, mode } = job.data;
    instance.subscribe(gameId, userId, mode);
    instance.broadcast(gameId);
}, { connection });

const unsubscribeWorker = new Worker('unsubscribeQueue', async (job) => {
    const { gameId, userId } = job.data;
    instance.unsubscribe(gameId, userId);
    instance.broadcast(gameId);
}, { connection });

const pbulishWorker = new Worker('publishQueue', async (job) => {
    const { gameId, userId } = job.data;
    instance.publish(gameId, userId);
}, { connection });

export { subscribeQueue, unsubscribeQueue, publishQueue };