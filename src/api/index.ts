import { Router } from "express";

import { findFilmByTitle } from "./film/film.controller";

const router = Router();

router.get("/film/:title", findFilmByTitle);

export default router;
