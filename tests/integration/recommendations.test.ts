import "../../src/setup";

import supertest from "supertest";
import app from "../../src/app";
import toMatchSchema from "../schemas/toMatchSchema";
import recommendations from '../utils/recommendations';
import recommendationSchemas from "../schemas/recommendationSchemas";
import { clearDatabase, closeConnection , clearRecommendations} from "../utils/database";
import { createGenre } from "../factories/genreFactory";

expect.extend({ toMatchSchema });

beforeAll(async()=>{
  await clearDatabase();
  //recommendations.valid needs valid genres
  //create 2 valid genres with ids 1 and 2
  await createGenre();
  await createGenre();
})

beforeEach(async()=>{
  await clearRecommendations();
})

afterAll(() => {
  closeConnection();
});

describe("POST /recommendations", () => {
  beforeEach(async () => {
    await clearRecommendations();
  });

  const postThis = async (data: object) =>
    await supertest(app).post("/recommendations").send(data);

  it("should respond with status 201 for a successful request", async () => {
    const response = await postThis(recommendations.valid);
    expect(response.status).toEqual(201);
  });

  it("should respond with the valid created recommendation", async () => {
    const response = await postThis(recommendations.valid);
    expect(response.body).toMatchSchema(recommendationSchemas.dbRecommendation);
  });

  it("should respond with status 400 for a payload that is not an Object", async () => {
    const response = await postThis(recommendations.wrongType);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when the properties are missing", async () => {
    const response = await postThis(recommendations.missingProps);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when the properties are empty", async () => {
    const response = await postThis(recommendations.emptyProps);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 406 when any genreId does not exist", async()=>{
    const response = await postThis(recommendations.genreIdNotRegistered);
    expect(response.status).toEqual(406);
  })

  it("should respond with status 409 when the youtubeLink is taken", async () => {
    await postThis(recommendations.valid);
    const response = await postThis(recommendations.valid);
    expect(response.status).toEqual(409);
  });
});
