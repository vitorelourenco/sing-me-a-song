import {Router} from 'express';
import {create, upvote, downvote, getRandom} from "../controllers/recommendationController";

const recommendation = Router();

recommendation.post("/", create);
recommendation.post("/:id/upvote", upvote);
recommendation.post("/:id/downvote", downvote);

recommendation.get("/random", getRandom);


export default recommendation;
