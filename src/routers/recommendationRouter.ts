import { Router } from "express";
import {
  create,
  upvote,
  downvote,
  getRandomWithScore,
  getTopRecommendations,
  getRandomByGenreId
} from "../controllers/recommendationController";

const recommendation = Router();

recommendation.post("/", create);
recommendation.post("/:id/upvote", upvote);
recommendation.post("/:id/downvote", downvote);

recommendation.get("/random", getRandomWithScore);
recommendation.get("/top/:amount", getTopRecommendations);

recommendation.get("/genres/:id/random", getRandomByGenreId);

export default recommendation;
