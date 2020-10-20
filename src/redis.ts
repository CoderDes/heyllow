import { createClient, RedisClient } from "redis";

const redisUrl: string | undefined = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("Url for redis connection is not provided.");
}

let client: RedisClient;

try {
  client = createClient(redisUrl);

  client.on("connect", () => {
    console.log(`Redis connected ${redisUrl}`);
  });
  client.on("error", err => {
    console.error(err);
  });
} catch (err) {
  console.error("Something went wrong with Redis.");
  throw err;
}

export default client;
