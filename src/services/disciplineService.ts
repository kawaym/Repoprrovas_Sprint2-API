import disciplineRepository from "../repositories/disciplineRepository.js";

async function findMany() {
  return disciplineRepository.findMany();
}
async function search(query: string) {
  return disciplineRepository.findMany(query);
}

export default {
  findMany,
  search,
};
