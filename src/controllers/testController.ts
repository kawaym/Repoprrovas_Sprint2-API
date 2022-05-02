import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy, search } = req.query as { groupBy: string; search: string };

  console.log(search);
  console.log("======");

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy, query: search });
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

async function searchTest(req: Request, res: Response) {
  const { search } = req.query as { search: string };
  const response = await testService.searchTest(search);
  res.send(response);
}

export default {
  find,
  create,
  addView,
  searchTest,
};
