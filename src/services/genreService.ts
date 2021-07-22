import genreRepository from "../repositories/genreRepository";

async function create(body:{name:string}){
  const dbNewGenre = await genreRepository.create(body.name);
  return dbNewGenre?.rows[0];
}

export default {
  create
}