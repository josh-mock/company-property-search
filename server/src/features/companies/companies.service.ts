import type {
  GetCompaniesQuery,
  GetCompanyTitlesParams,
} from "./companies.types.js";
import { companiesRepo } from "./companies.repo.js";
import { titlesRepo } from "@titles/titles.repo.js";

const getCompanies = async (query: GetCompaniesQuery) => {
  const [companies, numberOfResults] = await Promise.all([
    companiesRepo.getCompanies(query),
    companiesRepo.getCompaniesResultLength(query.q),
  ]);

  return { companies, numberOfResults };
};

const getCompanyTitles = async (params: GetCompanyTitlesParams) => {
  const { companyId } = params;

  const [company, titles] = await Promise.all([
    companiesRepo.getCompany(companyId),
    titlesRepo.getCompanyTitles(companyId),
  ]);

  return { company, titles };
};

export const companiesService = { getCompanies, getCompanyTitles };
