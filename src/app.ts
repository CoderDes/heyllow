import express from "express";

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
