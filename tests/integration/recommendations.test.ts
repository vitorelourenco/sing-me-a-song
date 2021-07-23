import "../../src/setup";

import supertest from "supertest";
import app from "../../src/app";
import toMatchSchema from "../schemas/toMatchSchema";
import recommendations from "../utils/recommendations";
import recommendationSchemas from "../schemas/recommendationSchemas";
import {
  clearDatabase,
  closeConnection,
  clearRecommendations,
  fillDatabase
} from "../utils/database";
import { createRecommendation } from "../factories/recommendationFactory";

expect.extend({ toMatchSchema });

beforeAll(async () => {
  await fillDatabase();
});

afterAll(async () => {
  await closeConnection();
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

  it("should respond with status 400 when any youtubeLink is not a youtube link", async () => {
    const response = await postThis(recommendations.linkNotFromYoutube);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 406 when any genreId does not exist", async () => {
    const response = await postThis(recommendations.genreIdNotRegistered);
    expect(response.status).toEqual(406);
  });

  it("should respond with status 409 when the youtubeLink is taken", async () => {
    await postThis(recommendations.valid);
    const response = await postThis(recommendations.valid);
    expect(response.status).toEqual(409);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  let recommendation: any;
  beforeEach(async () => {
    await clearRecommendations();
    recommendation = await createRecommendation();
  });

  const upvoteThis = async (id: number) =>
    await supertest(app).post(`/recommendations/${id}/upvote`);

  it("should respond with status 200 if the ID exists", async () => {
    const response = await upvoteThis(recommendation.id);
    expect(response.status).toEqual(200);
  });

  it("should respond with score 1 when upvoting a new recommendation", async () => {
    const response = await upvoteThis(recommendation.id);
    expect(response.body.score).toEqual(1);
  });

  it("should respond with status 404 if the ID does not exist", async () => {
    const response = await upvoteThis(2147483647);
    expect(response.status).toEqual(404);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  let recommendation: any;
  beforeEach(async () => {
    await clearRecommendations();
    recommendation = await createRecommendation();
  });

  const downvoteThis = async (id: number) =>
    await supertest(app).post(`/recommendations/${id}/downvote`);

  it("should respond with status 200 if the ID exists", async () => {
    const response = await downvoteThis(recommendation.id);
    expect(response.status).toEqual(200);
  });

  it("should respond with score -1 when downvoting a new recommendation", async () => {
    const response = await downvoteThis(recommendation.id);
    expect(response.body.score).toEqual(-1);
  });

  it("should respond with status 404 when score reaches -6", async () => {
    for (let i = 0; i < 5; i++) {
      await downvoteThis(recommendation.id);
    }
    const response = await downvoteThis(recommendation.id);
    expect(response.status).toEqual(404);
  });

  it("should respond with status 404 if the ID does not exist", async () => {
    const response = await downvoteThis(2147483647);
    expect(response.status).toEqual(404);
  });
});

describe("GET /recommendations/random", () => {
  beforeAll(async () => {
    await fillDatabase()
  });

  const getRandom = async () =>
    await supertest(app).get(`/recommendations/random`);

  it("should respond with status 200", async () => {
    const response = await getRandom();
    expect(response.status).toEqual(200);
  });

  it("should respond with a valid recommendation", async () => {
    const response = await getRandom();
    expect(response.body).toMatchSchema(recommendationSchemas.dbRecommendation);
  });

  it("should respond with status 404 if the database is empty", async () => {
    await clearDatabase();
    const response = await getRandom();
    expect(response.status).toEqual(404);
  });
});
