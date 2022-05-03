import supertest from "supertest";
import app from "../src/app.js";
import { createSession } from "./factories/userFactory.js";

describe("/get disciplines from server", () => {
  it("Should return all disciplines", async () => {
    const { token } = await createSession();
    const response = await supertest(app).get("/disciplines").set(token);

    const { status, body } = response;
    expect(status).toEqual(200);
    expect(typeof body).toEqual("object");
  });
  it("Should return all disciplines searched", async () => {
    const { token } = await createSession();
    const searchQuery = "xysgqn";

    const response = await supertest(app)
      .get(`/search/disciplines?search=${searchQuery}`)
      .set(token);

    const { status, body } = response;
    expect(status).toEqual(200);
    expect(body).toEqual({ disciplines: [] });
  });
});
