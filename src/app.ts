import express from "express";
import cors from "cors";
import genreRouter from './routers/genreRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/genres", genreRouter);

export default app;
