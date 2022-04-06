import express from "express";
import cors from "cors";
import pg from "pg-promise";
import tournamentroutes from "./routes/tournamentRoutes";
import "dotenv/config";
import characterRoutes from "./routes/characterRoutes";
import userRoutes from "./routes/userRoutes";
import communitiesRoutes from "./routes/communitiesRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import postsRoutes from "./routes/postsRoutes";
import repliesRoutes from "./routes/repliesRoutes";

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

app.use("/", characterRoutes);
app.use("/", communitiesRoutes);
app.use("/", eventsRoutes);
app.use("/", postsRoutes);
app.use("/", repliesRoutes);
app.use("/", tournamentroutes);
app.use("/", userRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}.`));
