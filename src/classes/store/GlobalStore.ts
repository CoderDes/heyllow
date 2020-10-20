import AppStore from "./AppStore";
import RedisStore from "./RedisStore";
import Film from "../Film";

class GlobalStore {
  private AppStore: typeof AppStore;
  private RedisStore: typeof RedisStore;

  constructor(app: typeof AppStore, redis: typeof RedisStore) {
    this.AppStore = app;
    this.RedisStore = redis;
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
}

export default new GlobalStore(AppStore, RedisStore);
