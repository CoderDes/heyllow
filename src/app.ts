import express from "express";

const app: express.Application = express();

app.listen(3000 || process.env.PORT);
