import { NextFunction, Request, Response } from "express";
import FilmModel from "./film.model";

export const findFilmByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const targetTitle: string = req.params.title;

  try {
    const film = await FilmModel.findAll({ where: { title: targetTitle } });
    res.status(200).json({ message: film });
  } catch (err) {
    next(err);
  }
};
