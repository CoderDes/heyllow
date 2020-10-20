import { NextFunction, Request, Response } from "express";

import Store from "../../classes/store/GlobalStore";
import FilmModel from "./film.model";
import Film from "../../classes/Film";

export const findFilmByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const targetTitle: string = req.params.title;

  try {
    const film: Film | undefined = Store.getFromApp(targetTitle);
    if (film) {
      res.status(200).json({ message: film });
      return;
    }

    const dataFromRedis: Object | null = await Store.getFromRedis(targetTitle);
    if (dataFromRedis) {
      res.status(200).json({ message: dataFromRedis });
      return;
    }

    const filmResult = await FilmModel.findAll({
      where: { title: targetTitle },
      plain: true,
      raw: true,
    });

    Store.addToApp(filmResult);
    Store.addToRedis(filmResult);

    res.status(200).json({ message: filmResult });
  } catch (err) {
    next(err);
  }
};
