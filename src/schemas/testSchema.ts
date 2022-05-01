import Joi from "joi";
import { TestCreationData } from "../repositories/testRepository.js";

export const testSchema = Joi.object<TestCreationData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().positive().required(),
  teacherId: Joi.number().positive().required(),
  disciplineId: Joi.number().positive().required(),
});
