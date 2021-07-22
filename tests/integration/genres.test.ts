import "../../src/setup";

import supertest from "supertest";
import app from "../../src/app";
import connection from '../../src/database';
import toMatchSchema from './schemas/toMatchSchema';
import genreSchemas from './schemas/genreSchemas';

expect.extend({ toMatchSchema });

afterAll(()=>{
  connection.end();
})

describe("POST /genres", () => {
  const postThis = async (data:object) => await supertest(app).post("/genres").send(data);
  const validGenre = {name:"Test song"};
  const wrongTypeGenre:any[] = [];
  const missingNameGenre = {};
  const emptyNameGenre = {name: ""};

  it("should respond with status 201 for a successful request", async () => {
    const response = await postThis(validGenre);
    expect(response.status).toEqual(201);
  });

  it("should respond with the valid created genre", async() =>{
    const response = await postThis(validGenre);
    expect(response.body).toMatchSchema(genreSchemas.dbGenre);
  })

  it("should respond with status 400 for a payload that is not an Object", async () => {
    const response = await postThis(wrongTypeGenre);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when property name is missing", async () => {
    const response = await postThis(missingNameGenre);
    expect(response.status).toEqual(400);
  });

  it("should respond with status 400 when property name is empty", async () => {
    const response = await postThis(emptyNameGenre);
    expect(response.status).toEqual(400);
  });

});
