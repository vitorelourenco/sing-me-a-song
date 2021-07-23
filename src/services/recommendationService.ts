import recommendationRepository from "../repositories/recommendationRepository";
import getYoutubeID from "get-youtube-id";
import ErrorWithStatus from "../utils/errorWithStatus";
import {
  setupRandomRecommendation,
  mergeGenresWithRecommendations,
  pickRandomWinner,
} from "../utils/recommendations";
import {Request} from 'express';

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

async function getRandomRecommendation() {
  const { scoreBoundary, comparison } = setupRandomRecommendation();
  const recommendationsWithGenres = await mergeGenresWithRecommendations(
    scoreBoundary,
    comparison
  );
  return pickRandomWinner(recommendationsWithGenres);
}

async function getTopRecommendations(req:Request){
  const amount = parseInt(req.params.amount);
  
  const recommendationsList = await (async ()=>{
    const list = await mergeGenresWithRecommendations(-2147483648, ">=");
    if (list.length === 0){
      throw new ErrorWithStatus("smas404");
    };
    list.sort((a,b)=> b.score - a.score);
    if (amount){
      list.splice(amount,);
    }
    return list;
  })();

  return recommendationsList;
}

export default {
  create,
  upvote,
  downvote,
  getRandomRecommendation,
  getTopRecommendations
};
