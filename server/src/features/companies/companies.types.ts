import z from "zod";
import {
  companySearchQuerySchema,
  companyTitlesParamsSchema,
} from "./companies.schemas.js";

export type GetCompaniesQuery = z.infer<typeof companySearchQuerySchema>;
export type GetCompanyTitlesParams = z.infer<typeof companyTitlesParamsSchema>;
