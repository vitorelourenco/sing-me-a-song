import connection from "../database";

async function create(genre: string) {
  return await connection.query(
    `
    INSERT INTO genres
    (name)
    VALUES
    ($1)
    RETURNING *
  `,
    [genre]
  );
}

async function getAll(){
  return await connection.query(`
    SELECT *
    FROM genres
  `);
}

export default {
  create,
  getAll
};
