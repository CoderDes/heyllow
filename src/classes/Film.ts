export default class Film {
  private _title: string;
  private _film_id: number;
  private _description: string;
  private _release_year: number;
  private _language_id: number;
  private _rental_duration: number;
  private _rental_rate: number;
  private _rating: string;
  private _replacement_cost: number;
  private _length: number;
  private _last_update: Date;
  private _special_features: Array<string>;
  private _fulltext: string;

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
    this._title = title;
    this._film_id = film_id;
    this._description = description;
    this._release_year = release_year;
    this._language_id = language_id;
    this._rental_duration = rental_duration;
    this._rental_rate = Number(rental_rate);
    this._replacement_cost = Number(replacement_cost);
    this._rating = rating;
    this._length = length;
    this._last_update = last_update;
    this._special_features = special_features;
    this._fulltext = fulltext;
  }

  public get title(): string {
    return this._title;
  }

  public get id(): number {
    return this._film_id;
  }

  public get description(): string {
    return this._description;
  }

  public get releaseYear(): number {
    return this._release_year;
  }

  public get rentalRate(): number {
    return this._rental_rate;
  }

  public get replacementCost(): number {
    return this._replacement_cost;
  }

  public get rentalDuration(): number {
    return this._rental_duration;
  }

  public get rating(): string {
    return this._rating;
  }

  public get languageId(): number {
    return this._language_id;
  }

  public get length(): number {
    return this._length;
  }

  public get lastUpdate(): Date {
    return this._last_update;
  }

  public get specialFeatures(): Array<string> {
    return this._special_features;
  }

  public get fullText(): string {
    return this._fulltext;
  }
}
