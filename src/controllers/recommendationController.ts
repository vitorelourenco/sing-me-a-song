import { Request, Response } from "express";
import recommendationSchemas from "../schemas/recommendationSchemas";
import recommendationService from "../services/recommendationService";
import { printError } from "../utils/errorWithStatus";

export async function create(req: Request, res: Response) {
  try {
    const { error: badRequest } = recommendationSchemas.create.validate(
      req.body
    );
    if (badRequest) return res.sendStatus(400);

    const newRecommendation = await recommendationService.create(req.body);

    res.status(201).send(newRecommendation);
  } catch (err) {
    printError(err);
    //23505: postgres error code for unique_violation https://www.postgresql.org/docs/9.2/errcodes-appendix.html
    if (err?.code === "23505") return res.sendStatus(409);
    //23503: postgres error code for foreign key violation https://www.postgresql.org/docs/9.2/errcodes-appendix.html
    if (err?.code === "23503") return res.sendStatus(406);
    //smas400: custom error > BadRequest identified in a deeper layer
    if (err?.message === "smas400") return res.sendStatus(400);
    res.sendStatus(500);
  }
}

async function vote(req: Request, res: Response, voteFunction: Function) {
  try {
    const id = parseInt(req.params.id);
    const body = await voteFunction(id);
    res.status(200).send(body);
  } catch (err) {
    printError(err);
    //smas404: custom error > param ID is not registered
    if (err?.message === "smas404") return res.sendStatus(404);
    res.sendStatus(500);
  }
}

export async function upvote(req: Request, res: Response) {
  await vote(req, res, recommendationService.upvote);
}

export async function downvote(req: Request, res: Response) {
  await vote(req, res, recommendationService.downvote);
}

export async function getRandomWithScore(req: Request, res: Response) {
  try {
    const recommendation =
      await recommendationService.getRandomWithScore();
    res.send(recommendation);
  } catch (err) {
    printError(err);
    if (err?.code() === "smas404") return res.sendStatus(404);
    res.sendStatus(500);
  }
}

export async function getTopRecommendations(req:Request, res:Response){
  try {
    const topRecommendations = await recommendationService.getTopWithLimit(req);
    res.send(topRecommendations);
  } catch (err) {
    printError(err);
    if (err?.code() === "smas404") return res.sendStatus(404);
    res.sendStatus(500);
  }
}

export async function getRandomByGenreId(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const randomOfId = await recommendationService.getRandomByGenreId(id);
    res.send(randomOfId);
  } catch (err) {
    printError(err);
    if (err?.code() === "smas404") return res.sendStatus(404);
    res.sendStatus(500);
  }
}