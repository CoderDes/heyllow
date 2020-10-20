import Film from "./Film";

class Store {
  private cache: Set<Film>;

  constructor() {
    this.cache = new Set();
  }

  public checkFilm(title: string): boolean {
    let exists = false;

    for (let film of this.cache) {
      if (film.getTitle() === title) {
        exists = true;
        break;
      }
    }

    return exists;
  }

  public getFilm(title: string): Film | undefined {
    for (let film of this.cache) {
      if (film.getTitle() === title) {
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

    this.cache.add(
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
    this.cache.clear();
  }
}

export default new Store();
