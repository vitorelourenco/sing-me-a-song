import express from "express";
import cors from "cors";
import genreRouter from "./routers/genreRouter";
import recommendationRouter from "./routers/recommendationRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/genres", genreRouter);

app.use("/recommendations", recommendationRouter);

export default app;
