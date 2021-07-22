import {Router} from 'express';
import {create, upvote} from "../controllers/recommendationController";

const recommendation = Router();

recommendation.post("/", create);
recommendation.post("/:id/upvote", upvote);

export default recommendation;
