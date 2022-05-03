import supertest from "supertest";
import app from "../src/app.js";
import { createSession } from "./factories/userFactory.js";

describe("/get teachers of a discipline from server", () => {
  it("Should return all teachers", async () => {
    const { token } = await createSession();
    const response = await supertest(app).get("/teachers?id=1").set(token);

    const { status, body } = response;
    expect(status).toEqual(200);
    expect(typeof body).toEqual("object");
  });
  it("Should return all teachers searched", async () => {
    const { token } = await createSession();
    const searchQuery = "xysgqn";

    const response = await supertest(app)
      .get(`/search/teachers?search=${searchQuery}`)
      .set(token);

    const { status, body } = response;
    expect(status).toEqual(200);
    expect(body).toEqual({ teachers: [] });
  });
});
