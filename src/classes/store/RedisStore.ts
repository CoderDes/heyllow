import { createClient, RedisClient } from "redis";
import { promisify } from "util";

class RedisStore {
  private readonly _url: string | undefined = process.env.REDIS_URL;
  private _client: RedisClient = createClient(
    this._url || "redis://127.0.0.1:6379",
  );

  public getAsyncFromRedis = promisify(this._client.get).bind(this._client);

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!this._url) {
      throw new Error("Url for redis connection is not provided.");
    }
    try {
      this._client.on("connect", () => {
        console.log(`Redis connected ${this._url}`);
      });
      this._client.on("error", err => {
        console.error(err);
      });
    } catch (err) {
      console.error("Something went wrong with Redis.");
      throw err;
    }
  }

  public set(key: string, value: string): void {
    this._client.set(key, value);
  }

  public clearCache() {
    this._client.FLUSHDB();
  }
}

export default new RedisStore();
