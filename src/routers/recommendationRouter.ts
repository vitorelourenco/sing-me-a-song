import {Router} from 'express';
import {create, upvote, downvote} from "../controllers/recommendationController";

const recommendation = Router();

recommendation.post("/", create);
recommendation.post("/:id/upvote", upvote);
recommendation.post("/:id/downvote", downvote);

export default recommendation;
