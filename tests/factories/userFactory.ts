import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function randomUser() {
  const user = {
    email: faker.internet.email(),
    password: "12321",
    hashedPassword: bcrypt.hashSync("12321", 10),
  };

  const { id } = await prisma.user.create({
    data: {
      email: user.email,
      password: user.hashedPassword,
    },
  });

  return { user, id };
}

export async function createSession() {
  const { user, id } = await randomUser();

  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);

  return { user, token: { Authorization: `Bearer ${token}` } };
}
