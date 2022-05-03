import supertest from "supertest";
import app from "../src/app.js";
import { createSession } from "./factories/userFactory.js";

describe("/get categories from server", () => {
  it("Should return all categories", async () => {
    const { token } = await createSession();
    const response = await supertest(app).get("/categories").set(token);

    const { status, body } = response;
    expect(status).toEqual(200);
    expect(typeof body).toEqual("object");
  });
});
