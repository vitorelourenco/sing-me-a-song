import connection from "../database";
import recommendationRepository from "../repositories/recommendationRepository";
import ErrorWithStatus from "./errorWithStatus";

interface Genre {
  id: number;
  name: string;
}
interface GenreRecommendation {
  id: number;
  genreId: number;
  recommendationId: number;
}
interface MergedRecommendation {
  id: number;
  genres: Genre[];
  youtubeLink: string;
  score: number;
  name: string;
}

export function makeGenresObj(genresArr: Genre[]) {
  const genresObj: { [key: number]: string } = {};
  genresArr.forEach((row) => {
    genresObj[row.id] = row.name;
  });
  return genresObj;
}

export function makeGenresRecommendationsObj(
  genresRecommendationsArr: GenreRecommendation[],
  genres: { [key: number]: string }
) {
  const genresRecommendationsObj: { [key: number]: Genre[] } = {};
  genresRecommendationsArr.forEach((row) => {
    const currentGenre = {
      id: row.genreId,
      name: genres[row.genreId],
    };
    if (genresRecommendationsObj[row.recommendationId]) {
      genresRecommendationsObj[row.recommendationId].push(currentGenre);
    } else {
      genresRecommendationsObj[row.recommendationId] = [currentGenre];
    }
  });
  return genresRecommendationsObj;
}

export async function mergeGenresWithRecommendations(
  scoreBoundary: number,
  comparison: "<" | ">=" | ">" | "<=" | "===" | "!=="
) {
  const recomendationsWithScoreArr =
    await recommendationRepository.getRecommendationsWithScore(
      scoreBoundary,
      comparison
    );
  const genresArr = await recommendationRepository.getGenres();
  const genresRecommendationsArr =
    await recommendationRepository.getGenresRecommendations();

  const genres = makeGenresObj(genresArr);
  const genresOfRecommendations = makeGenresRecommendationsObj(
    genresRecommendationsArr,
    genres
  );

  const mergedRecommendations: any[] = recomendationsWithScoreArr;
  mergedRecommendations.forEach((row) => {
    row.genres = genresOfRecommendations[row.id];
  });
  return mergedRecommendations;
}

export async function pickRandomWinner(
  mergedRecommendations: MergedRecommendation[]
) {
  const finalRecommendation = await (async () => {
    if (mergedRecommendations[0]) {
      mergedRecommendations.sort(() => 0.5 - Math.random());
      return mergedRecommendations[0];
    }
    //pick any recommendation with any score that is an integer
    const lastResort = await mergeGenresWithRecommendations(-2147483648, ">=");
    if (lastResort[0]) {
      lastResort.sort(() => 0.5 - Math.random());
      return lastResort[0];
    }
    throw new ErrorWithStatus("smas404");
  })();

  return finalRecommendation;
}

export function setupRandomRecommendation(): {
  scoreBoundary: number;
  comparison: "<" | ">=" | ">" | "<=" | "===" | "!==";
} {
  const tossUp = Math.random();
  const randomBoundary = 0.7;
  const scoreBoundary = 11;
  const comparison = tossUp < randomBoundary ? "<" : ">=";
  return { scoreBoundary, comparison };
}
