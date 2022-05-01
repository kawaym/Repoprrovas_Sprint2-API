import { prisma } from "../database.js";

async function findMany() {
  return prisma.discipline.findMany();
}
async function findUnique(id: number) {
  return prisma.discipline.findUnique({ where: { id } });
}

export default {
  findMany,
  findUnique,
};
