import recommendationRepository from "../repositories/recommendationRepository";
import getYoutubeID from 'get-youtube-id';
import ErrorWithStatus from '../utils/errorWithStatus';

async function create(body:{name:string, genresIds:number[], youtubeLink:string}){
  if(!getYoutubeID(body.youtubeLink)){
    throw new ErrorWithStatus("smas400");
  }
  return await recommendationRepository.create(body.name, body.genresIds, body.youtubeLink);
}

async function upvote(id:number){
  const body = await recommendationRepository.upvote(id);
  if (!body?.score && body?.score !== 0){
    throw new ErrorWithStatus("smas404");
  }
  return body;
}

async function downvote(id:number){
  return await recommendationRepository.upvote(id);
}

export default {
  create,
  upvote,
  downvote
}