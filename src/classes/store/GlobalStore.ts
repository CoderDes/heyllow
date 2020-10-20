import AppStore from "./AppStore";
import RedisStore from "./RedisStore";
import Film from "../Film";

class GlobalStore {
  private AppStore: typeof AppStore;
  private RedisStore: typeof RedisStore;
  private readonly cleanNodeIntervalMS: number = 5000;
  private readonly cleanRedisIntervalMS: number = 10000;
  private nodeTimer: NodeJS.Timeout | undefined;
  private redisTimer: NodeJS.Timeout | undefined;

  constructor(app: typeof AppStore, redis: typeof RedisStore) {
    this.AppStore = app;
    this.RedisStore = redis;
    this.initialize();
  }

  public async getFromRedis(title: string): Promise<Object | null> {
    const data: string | null = await this.RedisStore.getAsyncFromRedis(title);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  public getFromApp(title: string): Film | undefined {
    return this.AppStore.getFilm(title);
  }

  public addToApp(filmResult: any): void {
    this.AppStore.addFilm(filmResult);
  }

  public addToRedis(filmResult: any): void {
    this.RedisStore.set(filmResult.title, JSON.stringify(filmResult));
  }

  private startCleanNode(): void {
    const self = this;
    function go() {
      self.nodeTimer = setTimeout(function () {
        self.AppStore.clearCache();

        self.nodeTimer = setTimeout(go, self.cleanNodeIntervalMS);
      }, self.cleanNodeIntervalMS);
    }
    go();
  }

  private startCleanRedis(): void {
    const self = this;
    function go() {
      self.redisTimer = setTimeout(function () {
        self.RedisStore.clearCache();

        self.redisTimer = setTimeout(go, self.cleanRedisIntervalMS);
      }, self.cleanRedisIntervalMS);
    }
    go();
  }

  public initialize(): void {
    this.startCleanNode();
    this.startCleanRedis();
  }

  public stopClean(): void {
    if (this.nodeTimer && this.redisTimer) {
      clearTimeout(this.nodeTimer);
      clearTimeout(this.redisTimer);
    }
  }
}

export default new GlobalStore(AppStore, RedisStore);
