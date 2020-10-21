import AppStore from "./AppStore";
import RedisStore from "./RedisStore";
import Film from "../Film";

class GlobalStore {
  private _AppStore: typeof AppStore;
  private _RedisStore: typeof RedisStore;
  private readonly _cleanNodeIntervalMS: number = 5000;
  private readonly _cleanRedisIntervalMS: number = 10000;
  private _nodeTimer: NodeJS.Timeout | undefined;
  private _redisTimer: NodeJS.Timeout | undefined;

  constructor(app: typeof AppStore, redis: typeof RedisStore) {
    this._AppStore = app;
    this._RedisStore = redis;
    this.initialize();
  }

  public async getFromRedis(title: string): Promise<Object | null> {
    const data: string | null = await this._RedisStore.getAsyncFromRedis(title);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  public getFromApp(title: string): Film | undefined {
    return this._AppStore.getFilm(title);
  }

  public addToApp(filmResult: any): void {
    this._AppStore.addFilm(filmResult);
  }

  public addToRedis(filmResult: any): void {
    this._RedisStore.set(filmResult.title, JSON.stringify(filmResult));
  }

  private startCleanNode(): void {
    const self = this;
    function go() {
      self._nodeTimer = setTimeout(function () {
        self._AppStore.clearCache();

        self._nodeTimer = setTimeout(go, self._cleanNodeIntervalMS);
      }, self._cleanNodeIntervalMS);
    }
    go();
  }

  private startCleanRedis(): void {
    const self = this;
    function go() {
      self._redisTimer = setTimeout(function () {
        self._RedisStore.clearCache();

        self._redisTimer = setTimeout(go, self._cleanRedisIntervalMS);
      }, self._cleanRedisIntervalMS);
    }
    go();
  }

  public initialize(): void {
    this.startCleanNode();
    this.startCleanRedis();
  }

  public stopClean(): void {
    if (this._nodeTimer && this._redisTimer) {
      clearTimeout(this._nodeTimer);
      clearTimeout(this._redisTimer);
    }
  }
}

export default new GlobalStore(AppStore, RedisStore);
