import { Router } from "express";
import genreController from "../controllers/genreController";

const genres = Router();

genres.post("/", genreController.create);
genres.get("/", genreController.getAll);
genres.get("/:id", genreController.getById)

export default genres;
