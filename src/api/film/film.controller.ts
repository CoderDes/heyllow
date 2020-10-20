import { NextFunction, Request, Response } from "express";
import FilmModel from "./film.model";
import AppCache from "../../classes/Store";
import Film from "../../classes/Film";

export const findFilmByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const targetTitle: string = req.params.title;

  try {
    const isInAppMemory = AppCache.checkFilm(targetTitle);

    if (isInAppMemory) {
      const film: Film | undefined = AppCache.getFilm(targetTitle);
      if (film) {
        // TODO: possible place for ERR_HTTP_HEADERS_SENT error
        res.status(200).json({ message: film });
      }
    }

    const filmResult = await FilmModel.findAll({
      where: { title: targetTitle },
      plain: true,
      raw: true,
    });

    AppCache.addFilm(filmResult);
    res.status(200).json({ message: filmResult });
  } catch (err) {
    next(err);
  }
};
