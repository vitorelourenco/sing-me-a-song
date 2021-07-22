import "../../src/setup";

import supertest from "supertest";
import app from "../../src/app";
import toMatchSchema from "../schemas/toMatchSchema";
import recommendationSchemas from "../schemas/recommendationSchemas";
import { clearDatabase, closeConnection } from "../utils/database";
import { createGenre } from "../factories/genreFactory";

expect.extend({ toMatchSchema });

afterAll(() => {
  closeConnection();
});

describe("POST /recommendations", () => {
  beforeEach(async () => {
    await clearDatabase();
    await createGenre();
    await createGenre();
  });

  const postThis = async (data: object) =>
    await supertest(app).post("/recommendations").send(data);

  //genreIds id=1 and id=2 are created in the database beforeEach test run
  //checkout clearDatabase() for sequence reset (can't truncate FK tables)
  const validRecommendation = {
    name: "Test recommendation",
    genreIds: [1, 2],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };
  const wrongTypeRecommendation: any[] = [];
  const missingPropsRecommendation = {};
  const emptyPropsRecommendation: {
    name: string;
    genreIds: any[];
    youtubeLink: string;
  } = { name: "", genreIds: [], youtubeLink: "" };

  it("should respond with status 201 for a successful request", async () => {
    const response = await postThis(validRecommendation);
    expect(response.status).toEqual(201);
  });

  it("should respond with the valid created genre", async () => {
    const response = await postThis(validRecommendation);
    expect(response.body).toMatchSchema(recommendationSchemas.dbRecommendation);
  });

  it("should respond with status 400 for a payload that is not an Object", async () => {
    const response = await postThis(wrongTypeRecommendation);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when the properties are missing", async () => {
    const response = await postThis(missingPropsRecommendation);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when the properties are empty", async () => {
    const response = await postThis(emptyPropsRecommendation);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 409 when the youtubeLink is taken", async () => {
    await postThis(validRecommendation);
    const response = await postThis(validRecommendation);
    expect(response.status).toEqual(409);
  });
});
