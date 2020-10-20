import express, { Request, Response, NextFunction } from "express";

import DatabaseConnection from "./db";
import api from "./api/index";

const app: express.Application = express();
const port = 3000 || process.env.PORT;

DatabaseConnection.authenticate()
  .then(() => {
    console.log("Connected to database successfully.");

    app.listen(port, function () {
      console.log(`Server start to listen on ${port} port.`);
    });
  })
  .catch(err => {
    console.error(`Unable to connect to database: ${err}`);
  });

app.use("/api", api);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "SequelizeDatabaseError") {
    res.status(404).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
});
