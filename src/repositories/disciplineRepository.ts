import { prisma } from "../database.js";

async function findMany(query: string = "") {
  return prisma.discipline.findMany({ where: { name: { contains: query } } });
}
async function findUnique(id: number) {
  return prisma.discipline.findUnique({ where: { id } });
}

export default {
  findMany,
  findUnique,
};
