import express from "express";

import Database from "./db";

const app: express.Application = express();

Database.authenticate()
  .then(() => {
    console.log("Connected to database successfully.");
  })
  .catch(err => {
    console.error(`Unable to connect to database: ${err}`);
  });

app.listen(3000 || process.env.PORT);
