import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import { randomUser } from "./factories/userFactory.js";

describe("SignUp of an user", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });
  it("returns 201 for valid params", async () => {
    const body = { email: "dummy@dummy.com", password: "secretpass" };

    const result = await supertest(app)
      .post("/sign-up")
      .send({ email: body.email, password: body.password });
    const status = result.status;

    expect(status).toEqual(201);
  });
  it("returns 404 for invalid params", async () => {
    const body = {
      email: 121,
    };

    const result = await supertest(app).post("sign-up").send(body);
    const status = result.status;

    expect(status).toEqual(404);
  });
  it("return 404 for conflict user", async () => {
    const { user: body } = await randomUser();

    await supertest(app).post("sign-up").send(body);
    const result = await supertest(app).post("sign-up").send(body);
    const status = result.status;

    expect(status).toEqual(404);
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
});

describe("SignIn of an user", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });
  it("returns 200 for valid user", async () => {
    const { user } = await randomUser();
    const response = await supertest(app)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });
    const { status } = response;
    expect(status).toBe(200);
    expect(typeof response.body.token).toEqual("string");
    expect(response.body.token.length).toBeGreaterThan(0);
  });
  it("returns 404 for invalid params ", async () => {
    const body = {
      email: 121,
    };

    const result = await supertest(app).post("sign-in").send(body);
    const status = result.status;

    expect(status).toEqual(404);
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
});
