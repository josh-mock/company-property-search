import type { GetTitleCompaniesParams } from "./titles.types.js";
import { companiesRepo } from "@companies/companies.repo.js";
import { titlesRepo } from "./titles.repo.js";

const getTitleCompanies = async (params: GetTitleCompaniesParams) => {
  const { titleNumber } = params;
  const title = await titlesRepo.getTitle(titleNumber);
  const companies = await companiesRepo.getTitleCompanies(title.titleId);
  return { title, companies };
};

export const titlesService = { getTitleCompanies };
