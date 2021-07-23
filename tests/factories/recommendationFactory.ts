import connection from "../../src/database";

export async function createRecommendation({
  youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  name = "test",
  genresIds = [1, 2],
  score = 0
} = {}) {
  const dbRecommendationId = await connection.query(
    `
    INSERT INTO recommendations
    (name, "youtubeLink", score)
    VALUES
    ($1, $2, $3)
    RETURNING *
  `,
    [name, youtubeLink, score]
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
