import connection from "../../src/database";

export async function clearDatabase () {
  await connection.query(`DELETE FROM genres`);
  await connection.query(`ALTER SEQUENCE genres_id_seq RESTART WITH 1`);
  await connection.query(`DELETE FROM recommendations`);
  await connection.query(`ALTER SEQUENCE recommendations_id_seq RESTART WITH 1`);
  await connection.query(`TRUNCATE genres_recommendations RESTART IDENTITY`);
}

export async function closeConnection () {
  await connection.end();
}