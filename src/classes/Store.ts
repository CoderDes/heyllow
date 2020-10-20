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
    let target;

    for (let film of this.cache) {
      if (film.getTitle() === title) {
        target = film;
        break;
      }
    }

    return target;
  }

  public addFilm(film: Film): void {
    this.cache.add(film);
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export default new Store();
