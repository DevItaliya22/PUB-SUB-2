import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

// const envFile = process.env.NODE_ENV === 'production' 
//   ? '.env.production' 
//   : process.env.NODE_ENV === 'docker' 
//   ? '.env.docker' 
//   : '.env';

// dotenv.config({ path: join(__dirname, envFile) });

type Mode = 'player' | 'spectator';

interface UserType {
  userId: string;
  count: number;
  mode: Mode;
}

export class PubSubManager {
  private static instance: PubSubManager;
  private redisPubClient: RedisClientType; 
  private redisSubClient: RedisClientType; 
  private subscriptions: Map<string, UserType[]>;
  private io: any; 

  private constructor() {
    this.redisPubClient = createClient({ url: process.env.REDIS_PUBSUB_HOST });
    this.redisSubClient = createClient({ url: process.env.REDIS_PUBSUB_HOST });

    this.redisPubClient.connect();
    this.redisSubClient.connect();

    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  public setIo(io: any) {
    this.io = io;
  }

  public subscribe(gameId: string, userId: string, mode: Mode) {
    if (!this.subscriptions.has(gameId)) {
      this.subscriptions.set(gameId, []);
    }
    const user = { userId, count: 0, mode };
    this.subscriptions.get(gameId)?.push(user);

    if (this.subscriptions.get(gameId)?.length === 1) {
      this.redisSubClient.subscribe(gameId, (userId: string) => {
        this.addCount(gameId, userId);
        this.broadcast(gameId);
        this.log();
      });
    }
  }

  public unsubscribe(gameId: string, userId: string) { 
    if (!this.subscriptions.has(gameId)) {
      return 'No subscriptions found for this game';
    }
    this.subscriptions.set(
      gameId,
      this.subscriptions.get(gameId)?.filter(user => user.userId !== userId) || []
    );
    if (this.subscriptions.get(gameId)?.length === 0) {
      this.redisSubClient.unsubscribe(gameId);
      this.subscriptions.delete(gameId);
    }
  }

  public publish(gameId: string, userId: string) {
    this.redisPubClient.publish(gameId, userId); 
  }

  public addCount(gameId: string, userId: string) {
    const users = this.subscriptions.get(gameId);
    if (!users) {
      return 'No subscriptions found for this game';
    }
    this.subscriptions.set(
      gameId,
      users.map(user => {
        if (user.userId === userId) {
          user.count++;
        }
        return user;
      })
    );
  }

  public broadcast(gameId: string) {
    if (this.io) {
      const users = this.subscriptions.get(gameId);
      if (users) {
        this.io.to(gameId).emit('update', users);
      }
    }
  }

  public log() {
    console.log(this.subscriptions);
  }

  public async disconnect() {
    await this.redisPubClient.quit();
    await this.redisSubClient.quit();
  }
}
