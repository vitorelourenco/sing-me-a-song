import {Router} from 'express';
import genreController from "../controllers/genreController";

const genres = Router();

genres.post("/", genreController.create);

export default genres;
