import connection from "../../src/database";
import { createRecommendation } from "../factories/recommendationFactory";
import { createGenre } from "../factories/genreFactory";

export async function clearDatabase() {
  await connection.query(`TRUNCATE genres_recommendations RESTART IDENTITY`);
  await connection.query(`DELETE FROM genres`);
  await connection.query(`ALTER SEQUENCE genres_id_seq RESTART WITH 1`);
  await connection.query(`DELETE FROM recommendations`);
  await connection.query(
    `ALTER SEQUENCE recommendations_id_seq RESTART WITH 1`
  );
}

export async function clearRecommendations() {
  await connection.query(`TRUNCATE genres_recommendations RESTART IDENTITY`);
  await connection.query(`DELETE FROM recommendations`);
  await connection.query(
    `ALTER SEQUENCE recommendations_id_seq RESTART WITH 1`
  );
}

export async function clearGenres() {
  await connection.query(`TRUNCATE genres_recommendations RESTART IDENTITY`);
  await connection.query(`DELETE FROM genres`);
  await connection.query(`ALTER SEQUENCE genres_id_seq RESTART WITH 1`);
}

export async function fillDatabase(){
  await clearDatabase();
  //must start by adding genres
  const pg = []
  pg.push(createGenre({name:"electronic"}));
  pg.push(createGenre({name:"pop"}));
  pg.push(createGenre({name:"hiphop"}));
  pg.push(createGenre({name:"rock"}));
  pg.push(createGenre({name:"blues"}));
  pg.push(createGenre({name:"gospel"}));
  pg.push(createGenre({name:"funk"}));
  pg.push(createGenre({name:"opera"}));
  pg.push(createGenre({name:"rap"}));
  pg.push(createGenre({name:"swing"}));
  pg.push(createGenre({name:"classical"}));
  await Promise.all(pg);
  //
  //then onto the recommendations
  const pr = [];
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.com/watch?v=avYphbJsbaM",
    name:"test1",
    score:200,
    genresIds:[1,2]
  }));
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.com/watch?v=FJBgzX2HMe8",
    name:"test2",
    score:-5,
    genresIds:[11,1]
  }));
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.com/watch?v=C06jmdXfVF0",
    name:"test3",
    score:7,
    genresIds:[9,7,6]
  }));
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.com/watch?v=pqLvFfwcqfw",
    name:"test4",
    score:15,
    genresIds:[4,3,2]
  }));
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.com/watch?v=ub3pgNSL0S4",
    name:"test5",
    score:30,
    genresIds:[5,10]
  }));
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.com/watch?v=mxSRmLBuL4k",
    name:"test6",
    score:10,
    genresIds:[11]
  }));
  pr.push(createRecommendation({
    youtubeLink: "https://www.youtube.https://www.youtube.com/watch?v=JqnQ1R61MoM/watch?v=mxSRmLBuL4k",
    name:"test7",
    score:11,
    genresIds:[4,8]
  }));
  await Promise.all(pr);
}

export async function closeConnection() {
  await connection.end();
}
