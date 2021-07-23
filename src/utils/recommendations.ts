import recommendationRepository from "../repositories/recommendationRepository";

interface Recommendation {
  id: number,
  score: number,
  name: string,
  youtubeLink: string,
}
export interface Genre {
  id: number;
  name: string;
}
interface GenreRecommendation {
  id: number;
  genreId: number;
  recommendationId: number;
}
export interface RecommendationWithGenres extends Recommendation{
  genres: Genre[];
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
  recommendations: Recommendation[],
) {

  const genresArr = await recommendationRepository.getGenres();
  const genresRecommendationsArr =
    await recommendationRepository.getGenresRecommendations();

  const genres = makeGenresObj(genresArr);
  const genresOfRecommendations = makeGenresRecommendationsObj(
    genresRecommendationsArr,
    genres
  );

  const mergedRecommendations: any[] = recommendations;
  mergedRecommendations.forEach((row) => {
    row.genres = genresOfRecommendations[row.id];
  });
  return mergedRecommendations;
}

export async function pickRandomWinner(
  mergedRecommendations: RecommendationWithGenres[]
) {
  const finalRecommendation = await (async () => {
    if (mergedRecommendations[0]) {
      mergedRecommendations.sort(() => 0.5 - Math.random());
      return mergedRecommendations[0];
    }
    //pick any recommendation with any score
    const allRecommendations = await getAllRecommendations();
    const allMergedRecommendations = await mergeGenresWithRecommendations(allRecommendations);
    allMergedRecommendations.sort(() => 0.5 - Math.random());
    return allMergedRecommendations[0];
  })();

  return finalRecommendation;
}

export function recommendationSubQuery(criteria:"randomScore"|"top"|"", value?:number){
  function subQueryUsingRandomScore(){
    const tossUp = Math.random();
    const randomBoundary = 0.7;
    const scoreBoundary = 11;
    const comparison = tossUp < randomBoundary ? "<" : ">=";
    return `WHERE score ${comparison} ${scoreBoundary}`;
  }
  function subQueryUsingTopAmount(){
    return `
      ORDER BY score DESC
      ${value ? `LIMIT ${value}` : ""}
    `
  }
  function subQueryUsingNothing(){
    return "";
  }
  
  switch (criteria){
    case "randomScore": return subQueryUsingRandomScore();
    case "top": return subQueryUsingTopAmount();
    default: return subQueryUsingNothing();
  }
}

export async function getRecommendationsWithRandomScore(){
  const randomScoreSubQuery = recommendationSubQuery("randomScore");
  const recommendations = await recommendationRepository.getRecommendationsWithSubQuery(randomScoreSubQuery);
  return recommendations;
}

export async function getAllRecommendations(){
  const recommendations = await recommendationRepository.getRecommendationsWithSubQuery("");
  return recommendations;
};
