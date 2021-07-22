import "../../src/setup";

import supertest from "supertest";
import app from "../../src/app";
import connection from '../../src/database';

afterAll(()=>{
  connection.end();
})

describe("GET /test", () => {
  it("should answer with text \"OK!\" and status 200", async () => {
    const response = await supertest(app).get("/test");
    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
  });
});
