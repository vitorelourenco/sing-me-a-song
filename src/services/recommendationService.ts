import recommendationRepository from "../repositories/recommendationRepository";
import getYoutubeID from 'get-youtube-id';
import ErrorWithStatus from '../utils/errorWithStatus';

async function create(body:{name:string, genresIds:number[], youtubeLink:string}){
  if(!getYoutubeID(body.youtubeLink)){
    throw new ErrorWithStatus("smas400");
  }
  return await recommendationRepository.create(body.name, body.genresIds, body.youtubeLink);
}

export default {
  create
}