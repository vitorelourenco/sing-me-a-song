import connection from "../database";

async function create(name: string, genresIds: number[], youtubeLink: string) {
  const dbRecommendationId = await connection.query(
    `
    INSERT INTO recommendations
    (name, "youtubeLink")
    VALUES
    ($1, $2)
    RETURNING *
  `,
    [name, youtubeLink]
  );
  const newRecommendation = dbRecommendationId.rows[0];
  newRecommendation.genres = [];

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

    const dbGenre = await connection.query(
      `
      SELECT *
      FROM genres
      WHERE id = $1
    `,
      [genreId]
    );

    newRecommendation.genres.push(dbGenre.rows[0]);
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

async function getRecommendationsWithScore(
  scoreBoundary: number,
  comparison: "<" | ">=" | ">" | "<=" | "===" | "!=="
) {
  const dbRecommendations = await connection.query(
    `
    SELECT * 
    FROM recommendations
    WHERE score ${comparison} $1
  `,
    [scoreBoundary]
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
  getRecommendationsWithScore,
  getGenres,
  getGenresRecommendations,
};
