import env from "../constants/env";
import Redis from "ioredis";

const host = env.REDIS_HOST;
const port = +env.REDIS_PORT;
const db = env.REDIS_DB ? +env.REDIS_DB : 0;

export function createRedisConnection() {
    const redisClient = new Redis({
        host,
        port,
        maxRetriesPerRequest: 100,
        db,
    })

    redisClient.on('connect', () => console.dir({ message: 'Successfully connected to client redis' }));
    redisClient.on('error', (error) => console.dir({ message: 'Client redis error', error }));
    redisClient.on('reconnecting', (after) => console.dir({ message: 'Reconnecting to client redis server in ' + after + 'ms' }));

    return redisClient;
}

