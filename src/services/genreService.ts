import genreRepository from "../repositories/genreRepository";
import ErrorWithStatus from "../utils/errorWithStatus";

async function create(body: { name: string }) {
  const dbNewGenre = await genreRepository.create(body.name);
  return dbNewGenre?.rows[0];
}

async function getAll(){
  const genres = await genreRepository.getAll();
  if(!genres?.rows[0]){
    throw new ErrorWithStatus("smas404");
  }
  return genres.rows; 
}

export default {
  create,
  getAll
};
