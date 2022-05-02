import categoryRepository from "../repositories/categoryRepository.js";
import disciplineRepository from "../repositories/disciplineRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";
import testRepository, {
  TestCreationData,
} from "../repositories/testRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
  query: string;
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline(filter.query);
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers(filter.query);
  }
}

async function create(data: TestCreationData) {
  const existingTestName = await testRepository.getTestByName(data.name);
  const existingTestData = await testRepository.getTestByData({ ...data });

  const existingCategory = await categoryRepository.findUnique(data.categoryId);
  const existingTeacher = await teacherRepository.findUnique(data.teacherId);
  const existingDiscipline = await disciplineRepository.findUnique(
    data.disciplineId
  );

  if (!(existingCategory && existingTeacher && existingDiscipline))
    throw notFoundError("Test with invalid parameter Id");

  if (existingTestData || existingTestName)
    throw conflictError("Test must be unique");

  await testRepository.create(data);
}

async function addView(id: number) {
  const existingTest = await testRepository.getTestById(id);

  if (!existingTest) throw notFoundError("Test doesn't exist");

  await testRepository.addView(id);
}

async function searchTest(query: string) {
  return testRepository.searchTest(query);
}

export default {
  find,
  create,
  addView,
  searchTest,
};
