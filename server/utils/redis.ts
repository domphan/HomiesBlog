import * as redis from 'redis';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import { tokenGenerator } from './jwt';



export const redisClient: RedisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.log('Error: ' + err);
});

const getAsyncHelper = promisify(redisClient.get).bind(redisClient);
const setAsyncHelper = promisify(redisClient.set).bind(redisClient);
const delAsyncHelper = promisify(redisClient.del).bind(redisClient);

export const getAsync = async (key: string) => await getAsyncHelper(`${key}`);

export const delAsync = async (key: string) => await delAsyncHelper(`${key}`);

export const setAsync = async (key: string, value: string) =>
    await setAsyncHelper(`${key}`, `${value}`);

export const setCacheJWT = async (uuid: number, newJWT: string) => {
    const value = JSON.stringify(newJWT);
    const key = `${uuid}#JWT`;
    setAsync(key, value);
};

