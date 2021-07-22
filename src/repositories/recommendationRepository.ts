import connection from '../database';

async function create(name:string, genresIds:number[], youtubeLink:string){
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

export default {
  create
}