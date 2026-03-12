import z from "zod";
import { titleCompaniesParamsSchema } from "./titles.schemas.js";

export type GetTitleCompaniesParams = z.infer<
  typeof titleCompaniesParamsSchema
>;
