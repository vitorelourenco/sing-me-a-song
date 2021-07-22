import connection from "../../src/database";

export async function createRecommendation() {
  const name = "test";
  const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  const genresIds = [1,2]
  const dbRecommendationId = await connection.query(`
    INSERT INTO recommendations
    (name, "youtubeLink")
    VALUES
    ($1, $2)
    RETURNING *
  `,[name, youtubeLink]);
  const newRecommendation = dbRecommendationId.rows[0];
  newRecommendation.genres = [];

  for (const genreId of genresIds){
    await connection.query(`
      INSERT INTO "genres_recommendations"
      ("genreId", "recommendationId")
      VALUES
      ($1, $2)
    `,[genreId, newRecommendation.id]);

    const dbGenre = await connection.query(`
      SELECT *
      FROM genres
      WHERE id = $1
    `,[genreId]);

    newRecommendation.genres.push(dbGenre.rows[0])
  }

  return newRecommendation;
}
