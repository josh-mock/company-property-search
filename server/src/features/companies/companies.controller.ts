import type { Request, Response } from "express";
import { companiesService } from "./companies.service.js";
import {
  companySearchQuerySchema,
  companyTitlesParamsSchema,
} from "./companies.schemas.js";

const getCompanies = async (req: Request, res: Response) => {
  const query = companySearchQuerySchema.parse(req.query);

  const result = await companiesService.getCompanies(query);

  return res.status(200).json(result);
};

const getCompanyTitles = async (req: Request, res: Response) => {
  const params = companyTitlesParamsSchema.parse(req.params);

  const result = await companiesService.getCompanyTitles(params);

  return res.status(200).json(result);
};

export const companiesController = { getCompanies, getCompanyTitles };
