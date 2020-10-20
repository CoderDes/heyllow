export default class Film {
  private title: string;
  private film_id: number;
  private description: string;

  constructor(title: string, film_id: number, description: string) {
    this.title = title;
    this.film_id = film_id;
    this.description = description;
  }

  public getTitle(): string {
    return this.title;
  }

  public getId(): number {
    return this.film_id;
  }

  public getDescription(): string {
    return this.description;
  }
}
