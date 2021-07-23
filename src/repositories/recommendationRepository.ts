import { number } from "joi";
import connection from "../database";
import ErrorWithStatus from "../utils/errorWithStatus";

async function create(name: string, genresIds: number[], youtubeLink: string) {
  //check if genres exist or throw
  //insert new recommendation
  //link recommendation to genres
  
  const genres:{id:number, name:string}[] = [];

  for (const genreId of genresIds){
    const dbGenre = await connection.query(
      `
        SELECT *
        FROM genres
        WHERE id = $1
      `,
      [genreId]
    );
    if (dbGenre?.rows[0]){
      genres.push(dbGenre.rows[0]);
    } else {
      throw new ErrorWithStatus("smas404");
    }
  }

  const dbRecommendation = await connection.query(
    `
    INSERT INTO recommendations
    (name, "youtubeLink")
    VALUES
    ($1, $2)
    RETURNING *
  `,
    [name, youtubeLink]
  );
  const newRecommendation = dbRecommendation.rows[0];
  newRecommendation.genres = genres;

  for (const genreId of genresIds) {
    await connection.query(
      `
      INSERT INTO "genres_recommendations"
      ("genreId", "recommendationId")
      VALUES
      ($1, $2)
    `,
      [genreId, newRecommendation.id]
    );
  }

  return newRecommendation;
}

async function vote(id: number, val: number) {
  const dbScore = await connection.query(
    `
    UPDATE recommendations
    SET score = score + $1
    WHERE id = $2
    RETURNING score
  `,
    [val, id]
  );
  return dbScore.rows[0];
}

async function upvote(id: number) {
  return await vote(id, 1);
}

async function downvote(id: number) {
  return await vote(id, -1);
}

async function remove(id: number) {
  await connection.query(
    `
    DELETE 
    FROM "genres_recommendations"
    WHERE "recommendationId" = $1
  `,
    [id]
  );

  await connection.query(
    `
    DELETE 
    FROM recommendations
    WHERE id = $1
  `,
    [id]
  );
}

async function getRecommendationsWithSubQuery(subQuery: string) {
  const dbRecommendations = await connection.query(
    `
    SELECT * 
    FROM recommendations
    ${subQuery}
  `
  );
  return dbRecommendations.rows;
}

async function getGenres() {
  const dbGenres = await connection.query(`
    SELECT * 
    FROM genres
  `);
  return dbGenres.rows;
}

async function getGenresRecommendations() {
  const dbGenres_Recommendations = await connection.query(`
    SELECT * 
    FROM "genres_recommendations"
  `);
  return dbGenres_Recommendations.rows;
}

export default {
  create,
  remove,
  upvote,
  downvote,
  getRecommendationsWithSubQuery,
  getGenres,
  getGenresRecommendations,
};
