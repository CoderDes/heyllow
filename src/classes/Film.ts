export default class Film {
  private title: string;
  private film_id: number;
  private description: string;
  private release_year: number;
  private language_id: number;
  private rental_duration: number;
  private rental_rate: number;
  private rating: string;
  private replacement_cost: number;
  private length: number;
  private last_update: Date;
  private special_features: Array<string>;
  private fulltext: string;

  constructor(
    title: string,
    film_id: number,
    description: string,
    release_year: number,
    language_id: number,
    rental_duration: number,
    rental_rate: string,
    replacement_cost: string,
    rating: string,
    length: number,
    last_update: Date,
    special_features: Array<string>,
    fulltext: string,
  ) {
    this.title = title;
    this.film_id = film_id;
    this.description = description;
    this.release_year = release_year;
    this.language_id = language_id;
    this.rental_duration = rental_duration;
    this.rental_rate = Number(rental_rate);
    this.replacement_cost = Number(replacement_cost);
    this.rating = rating;
    this.length = length;
    this.last_update = last_update;
    this.special_features = special_features;
    this.fulltext = fulltext;
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

  public getReleaseYear(): number {
    return this.release_year;
  }

  public getRentalRate(): number {
    return this.rental_rate;
  }

  public getReplacementCost(): number {
    return this.replacement_cost;
  }

  public getRentalDuration(): number {
    return this.rental_duration;
  }

  public getRating(): string {
    return this.rating;
  }

  public getLanguageId(): number {
    return this.language_id;
  }

  public getLength(): number {
    return this.length;
  }

  public getLastUpdate(): Date {
    return this.last_update;
  }

  public getSpecialFeatures(): Array<string> {
    return this.special_features;
  }

  public getFullText(): string {
    return this.fulltext;
  }
}
