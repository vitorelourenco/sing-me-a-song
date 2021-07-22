import "../../src/setup";

import supertest from "supertest";
import app from "../../src/app";
import toMatchSchema from "../schemas/toMatchSchema";
import genreSchemas from "../schemas/genreSchemas";
import {clearDatabase, clearGenres, closeConnection} from '../utils/database';
import genres from '../utils/genres';
expect.extend({ toMatchSchema });

beforeAll(async()=>{
  await clearDatabase();
})

beforeEach(async()=>{
  await clearGenres();
})

afterAll(async () => {
  await closeConnection();
});

describe("POST /genres", () => {
  beforeEach(async ()=>{
    await clearGenres();
  });

  const postThis = async (data: object) =>
    await supertest(app).post("/genres").send(data);

  it("should respond with status 201 for a successful request", async () => {
    const response = await postThis(genres.valid);
    expect(response.status).toEqual(201);
  });

  it("should respond with the valid created genre", async () => {
    const response = await postThis(genres.valid);
    expect(response.body).toMatchSchema(genreSchemas.dbGenre);
  });

  it("should respond with status 400 for a payload that is not an Object", async () => {
    const response = await postThis(genres.wrongType);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when property name is missing", async () => {
    const response = await postThis(genres.missingProps);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when property name is empty", async () => {
    const response = await postThis(genres.emptyProps);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 409 when the genre name is taken", async ()=>{
    await postThis(genres.valid);
    const response = await postThis(genres.valid);
    expect(response.status).toEqual(409);
  })
});
