import recommendationRepository from "../repositories/recommendationRepository";

async function create(body:{name:string, genresIds:number[], youtubeLink:string}){
  return await recommendationRepository.create(body.name, body.genresIds, body.youtubeLink);
}

export default {
  create
}