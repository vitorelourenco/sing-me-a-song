import connection from "../../src/database";
import faker from "faker";

export async function createGenre({ name = faker.music.genre() } = {}) {
  await connection.query(
    `
    INSERT INTO genres
    (name)
    VALUES
    ($1)
  `,
    [name]
  );
}
