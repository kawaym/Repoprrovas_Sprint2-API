import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy } = req.query as { groupBy: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy });
  if (groupBy === "disciplines") console.log(tests);
  res.send({ tests });
}

async function create(req: Request, res: Response) {
  const test = req.body;

  await testService.create(test);

  res.sendStatus(201);
}
async function addView(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  await testService.addView(parseInt(id));
  res.sendStatus(200);
}

export default {
  find,
  create,
  addView,
};
