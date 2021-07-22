import express from "express";
import cors from "cors";
import genreRouter from './routers/genreRouter';
import recommendationController from './controllers/recommendationController';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/genres", genreRouter);

app.post("/recommendations", recommendationController.create);

export default app;
