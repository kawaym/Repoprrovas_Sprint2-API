import { prisma } from "../database.js";

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

export interface TestCreationData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherId: number;
  disciplineId: number;
}
async function getTestByName(name: string) {
  return prisma.test.findFirst({ where: { name } });
}

async function getTestByData(test: Omit<TestCreationData, "name">) {
  const teacherDisciplineId = await prisma.teacherDiscipline.findFirst({
    where: { teacherId: test.teacherId, disciplineId: test.disciplineId },
  });
  return prisma.test.findFirst({
    where: {
      pdfUrl: test.pdfUrl,
      categoryId: test.categoryId,
      teacherDisciplineId: teacherDisciplineId.id,
    },
  });
}

async function create(test: TestCreationData) {
  const teacherDisciplineId = await prisma.teacherDiscipline.findFirst({
    where: { teacherId: test.teacherId, disciplineId: test.disciplineId },
  });
  return prisma.test.create({
    data: {
      name: test.name,
      pdfUrl: test.pdfUrl,
      categoryId: test.categoryId,
      teacherDisciplineId: teacherDisciplineId.id,
    },
  });
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  getTestByName,
  getTestByData,
  create,
};
