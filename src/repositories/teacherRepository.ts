import { prisma } from "../database.js";

async function findByDiscipline(id: number) {
  return prisma.teacher.findMany({
    where: {
      teacherDisciplines: { some: { disciplineId: id } },
    },
  });
}
async function findUnique(id: number) {
  return prisma.teacher.findUnique({ where: { id } });
}
async function findMany(query: string = "") {
  return prisma.teacher.findMany({ where: { name: { contains: query } } });
}

export default {
  findByDiscipline,
  findUnique,
  findMany,
};
