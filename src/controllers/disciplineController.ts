import { Request, Response } from "express";
import disciplineService from "../services/disciplineService.js";

async function search(req: Request, res: Response) {
  const { search } = req.query as { search: string };
  if (!search) {
    const disciplines = await disciplineService.findMany();
    res.send({ disciplines });
    return;
  }
  const disciplines = await disciplineService.search(search);
  res.send({ disciplines });
}

export default {
  search,
};
