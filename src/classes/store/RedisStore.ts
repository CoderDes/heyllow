import { createClient, RedisClient } from "redis";
import { promisify } from "util";

class RedisStore {
  private readonly url: string | undefined = process.env.REDIS_URL;
  private client: RedisClient = createClient(
    this.url || "redis://127.0.0.1:6379",
  );

  public getAsyncFromRedis = promisify(this.client.get).bind(this.client);

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!this.url) {
      throw new Error("Url for redis connection is not provided.");
    }
    try {
      this.client.on("connect", () => {
        console.log(`Redis connected ${this.url}`);
      });
      this.client.on("error", err => {
        console.error(err);
      });
    } catch (err) {
      console.error("Something went wrong with Redis.");
      throw err;
    }
  }

  public set(key: string, value: string): void {
    this.client.set(key, value);
  }

  public clearCache() {
    this.client.FLUSHDB();
  }
}

export default new RedisStore();
