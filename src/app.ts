import express from "express";
import cors from "cors";
import connection from './database';
import genreController from "./controllers/genreController";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/genres", genreController.create);

export default app;
