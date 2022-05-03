import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import { createSession } from "./factories/userFactory.js";

describe("Read of tests from server", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prisma.$disconnect();
  });
  it("Should return an array of tests sorted by discipline", async () => {
    const { token } = await createSession();

    const response = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set(token);
    const { status, body } = response;
    expect(status).toBe(200);
    expect(typeof body).toEqual("object");
  });
  it("Should return an array of tests sorted by teacher", async () => {
    const { token } = await createSession();

    const response = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set(token);
    const { status, body } = response;
    expect(status).toBe(200);
    expect(typeof body).toEqual("object");
  });
  afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });
});
