import express from "express";
import cors from "cors";
import pg from "pg-promise";
import tournamentroutes from "./routes/tournamentroutes";
import "dotenv/config";
import characterRoutes from "./routes/Characters";

const app = express();

const port = 3001;

app.use(cors());

app.use(express.json());

export const db = pg()({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

app.use("/", tournamentroutes);
app.use("/", characterRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}.`));
