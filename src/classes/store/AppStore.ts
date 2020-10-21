import Film from "../Film";

class AppStore {
  private _cache: Set<Film>;

  constructor() {
    this._cache = new Set();
  }

  public getFilm(title: string): Film | undefined {
    for (let film of this._cache) {
      if (film.title === title) {
        return film;
      }
    }
  }

  public addFilm(filmResult: any): void {
    const filmData: any = JSON.parse(JSON.stringify(filmResult));
    const {
      title,
      film_id,
      description,
      release_year,
      language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      last_update,
      special_features,
      fulltext,
    } = filmData;

    this._cache.add(
      new Film(
        title,
        film_id,
        description,
        release_year,
        language_id,
        rental_duration,
        rental_rate,
        replacement_cost,
        rating,
        length,
        last_update,
        special_features,
        fulltext,
      ),
    );
  }

  public clearCache(): void {
    this._cache.clear();
  }

  public get cache(): Set<Film> {
    return this._cache;
  }
}

export default new AppStore();
