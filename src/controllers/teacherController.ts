import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function findByDiscipline(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  console.log(id);
  if (!id) {
    return res.sendStatus(400);
  }
  console.log(id);

  const teachers = await teacherService.findByDiscipline(parseInt(id));
  res.send({ teachers });
}

export default {
  findByDiscipline,
};
