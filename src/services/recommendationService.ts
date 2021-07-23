import recommendationRepository from "../repositories/recommendationRepository";
import getYoutubeID from "get-youtube-id";
import ErrorWithStatus from "../utils/errorWithStatus";
import {
  mergeGenresWithRecommendations,
  pickRandomWinner,
  recommendationSubQuery,
} from "../utils/recommendations";
import { Request } from "express";
import genreService from "./genreService";

async function create(body: {
  name: string;
  genresIds: number[];
  youtubeLink: string;
}) {
  if (!getYoutubeID(body.youtubeLink)) {
    throw new ErrorWithStatus("smas400");
  }
  return await recommendationRepository.create(
    body.name,
    body.genresIds,
    body.youtubeLink
  );
}

async function upvote(id: number) {
  const body = await recommendationRepository.upvote(id);
  if (!body?.score && body?.score !== 0) {
    throw new ErrorWithStatus("smas404");
  }
  return body;
}

async function downvote(id: number): Promise<any> {
  const body = await recommendationRepository.downvote(id);
  if (!body?.score && body?.score !== 0) {
    throw new ErrorWithStatus("smas404");
  }
  //if score<-5 delete and recall downvote, this will throw smas404
  if (body?.score < -5) {
    await recommendationRepository.remove(id);
    return await downvote(id);
  } else {
    return body;
  }
}

async function getRecommendationsWithGenresUsingSubquery(
  criteria: "randomScore" | "top" | "",
  value?: number
) {
  const subQuery = recommendationSubQuery(criteria, value);
  const recommendations =
    await recommendationRepository.getRecommendationsWithSubQuery(subQuery);
  const recommendationsWithGenres = await mergeGenresWithRecommendations(
    recommendations
  );
  return recommendationsWithGenres;
}

async function getRandomWithScore() {
  const recommendationsWithGenres =
    await getRecommendationsWithGenresUsingSubquery("randomScore");
  if (!recommendationsWithGenres[0]) {
    throw new ErrorWithStatus("smas404");
  }
  return await pickRandomWinner(recommendationsWithGenres);
}

async function getTopWithLimit(req: Request) {
  const amount = parseInt(req.params.amount);
  const orderedRecommendationsWithGenres =
    await getRecommendationsWithGenresUsingSubquery("top", amount);
  if (!orderedRecommendationsWithGenres[0]) {
    throw new ErrorWithStatus("smas404");
  }
  return orderedRecommendationsWithGenres;
}

async function getAll(){
  const all =
    await getRecommendationsWithGenresUsingSubquery("");
  if (!all[0]) {
    throw new ErrorWithStatus("smas404");
  }
  return all;
}

async function getRandomByGenreId(id: number) {
  const genreWithRecommendations =
    await genreService.getById(id) 

  if (!genreWithRecommendations || !genreWithRecommendations?.recommendations) {
    throw new ErrorWithStatus("smas404");
  }
  const recommendations = genreWithRecommendations.recommendations;
  return await pickRandomWinner(recommendations);
}

export default {
  create,
  upvote,
  downvote,
  getRandomWithScore,
  getTopWithLimit,
  getAll,
  getRandomByGenreId
};
