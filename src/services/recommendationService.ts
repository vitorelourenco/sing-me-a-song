import recommendationRepository from "../repositories/recommendationRepository";
import getYoutubeID from "get-youtube-id";
import ErrorWithStatus from "../utils/errorWithStatus";
import {
  setupRandomRecommendation,
  mergeGenresWithRecommendations,
  pickRandomWinner,
} from "../utils/recommendations";

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

export default {
  create,
  upvote,
  downvote,
  getRandomRecommendation,
};
