import { Router } from "express";
import teacherController from "../controllers/teacherController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const teacherRouter = Router();

teacherRouter.get(
  "/teachers",
  ensureAuthenticatedMiddleware,
  teacherController.findByDiscipline
);
teacherRouter.get(
  "/search/teachers",
  ensureAuthenticatedMiddleware,
  teacherController.search
);

export default teacherRouter;
