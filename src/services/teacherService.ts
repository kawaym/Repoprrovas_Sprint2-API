import teacherRepository from "../repositories/teacherRepository.js";

async function findByDiscipline(id: number) {
  return teacherRepository.findByDiscipline(id);
}
async function findMany() {
  return teacherRepository.findMany();
}
async function search(query: string) {
  return teacherRepository.findMany(query);
}

export default {
  findByDiscipline,
  findMany,
  search,
};
