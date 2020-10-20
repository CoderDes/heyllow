import { NextFunction, Request, Response } from "express";
import { promisify } from "util";

import RedisClient from "../../redis";
import FilmModel from "./film.model";
import AppCache from "../../classes/Store";
import Film from "../../classes/Film";

const getAsyncFromRedis = promisify(RedisClient.get).bind(RedisClient);

export const findFilmByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const targetTitle: string = req.params.title;

  try {
    const isInAppMemory: boolean = AppCache.checkFilm(targetTitle);
    if (isInAppMemory) {
      const film: Film | undefined = AppCache.getFilm(targetTitle);

      if (film) {
        res.status(200).json({ message: film });
      }

      return;
    }

    const resultFromRedis: string | null = await getAsyncFromRedis(targetTitle);
    if (resultFromRedis !== null) {
      res.status(200).json({ message: JSON.parse(resultFromRedis) });
      return;
    }

    const filmResult = await FilmModel.findAll({
      where: { title: targetTitle },
      plain: true,
      raw: true,
    });

    AppCache.addFilm(filmResult);
    await RedisClient.set(targetTitle, JSON.stringify(filmResult));

    res.status(200).json({ message: filmResult });
  } catch (err) {
    next(err);
  }
};
