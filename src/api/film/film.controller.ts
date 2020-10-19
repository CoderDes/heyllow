import { Request, Response } from "express";
import FilmModel from "./film.model";

export const findFilmByTitle = (req: Request, res: Response) => {
  const { title } = req.params;
};
