import type { Request, Response } from "express";
import { titlesService } from "./titles.service.js";
import { titleCompaniesParamsSchema } from "./titles.schemas.js";

const getTitleCompanies = async (req: Request, res: Response) => {
  const params = titleCompaniesParamsSchema.parse(req.params);

  const result = await titlesService.getTitleCompanies(params);

  return res.status(200).json(result);
};

export const titlesController = { getTitleCompanies };
