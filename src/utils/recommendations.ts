import recommendationRepository from "../repositories/recommendationRepository";

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

export function pickRandomWinner(
  mergedRecommendations: MergedRecommendation[]
) {
  mergedRecommendations.sort(() => 0.5 - Math.random());

  if (!mergedRecommendations[0]) {
    //just send something if there's no match in the DB
    return {
      id: 2147483647,
      name: "fake",
      genres: [{ id: 2147483647, name: "fake" }],
      youtubeLink: "https://www.youtube.com/watch?v=oavMtUWDBTM",
      score: 2147483647,
    };
  }
  return mergedRecommendations[0];
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
