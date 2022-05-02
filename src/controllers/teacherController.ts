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
async function findMany(req: Request, res: Response) {
  const teachers = await teacherService.findMany();
  res.send({ teachers });
}

async function search(req: Request, res: Response) {
  const { search } = req.query as { search: string };
  const teachers = await teacherService.search(search);
  res.send({ teachers });
}

export default {
  findByDiscipline,
  findMany,
  search,
};
