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

export default {
  findByDiscipline,
  findUnique,
};
