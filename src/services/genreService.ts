import genreRepository from "../repositories/genreRepository";
import ErrorWithStatus from "../utils/errorWithStatus";
import { Genre, RecommendationWithGenres } from "../utils/recommendations";
import recommendationService from "../services/recommendationService";

async function create(body: { name: string }) {
  const dbNewGenre = await genreRepository.create(body.name);
  return dbNewGenre?.rows[0];
}

async function getAll() {
  const genres = await genreRepository.getAll();
  if (!genres?.rows[0]) {
    throw new ErrorWithStatus("smas404");
  }
  return genres.rows;
}

async function getById(id: number) {
  const dbGenre = await genreRepository.getById(id);
  const genre = dbGenre.rows[0];

  if (!genre) {
    throw new ErrorWithStatus("smas404");
  }

  let allRecommendations: RecommendationWithGenres[] = [];

  try {
    allRecommendations = await recommendationService.getAll();
  } catch (err) {
    //stop recommendationService.getAll() from throwing smas404
    //it should be possible to have no recommendations for a genre
  }

  const recommendationsForThisGenre = allRecommendations.filter((rec) => {
    let hasThisGenre = false;
    rec?.genres?.forEach((genre: Genre) => {
      if (genre.id === id) {
        hasThisGenre = true;
      }
    });
    return hasThisGenre;
  });

  let genreScore = 0;
  recommendationsForThisGenre.forEach((rec) => {
    genreScore += rec.score;
  });

  genre.score = genreScore;
  genre.recommendations = recommendationsForThisGenre;

  return genre;
}

export default {
  create,
  getAll,
  getById,
};
