import { Router } from "express";
import {
  create,
  upvote,
  downvote,
  getRandomWithScore,
  getTopRecommendations,
} from "../controllers/recommendationController";

const recommendation = Router();

recommendation.post("/", create);
recommendation.post("/:id/upvote", upvote);
recommendation.post("/:id/downvote", downvote);

recommendation.get("/random", getRandomWithScore);
recommendation.get("/top/:amount", getTopRecommendations);


export default recommendation;
