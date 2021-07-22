import {Router} from 'express';
import recommendationController from "../controllers/recommendationController";

const recommendation = Router();

recommendation.post("/", recommendationController.create);

export default recommendation;
