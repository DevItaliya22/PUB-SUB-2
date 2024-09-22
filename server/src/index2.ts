import Redis from 'ioredis';

const redisClient = new Redis('rediss://red-cqsopmo8fa8c73dhltkg:i12MQLGFxLSP3A7GivuFxKlfWxmylpdj@oregon-redis.render.com:6379', {
    maxRetriesPerRequest: null,
    enableReadyCheck: false, // Optional, depending on your needs
});

redisClient.on('connect', () => {
    console.log('Connected to Redis instance');
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});