import { db } from "@/lib/db/db.js";
import { GetCompaniesQuery } from "./companies.types.js";
import { AppError } from "@/lib/utils/AppError.js";

const getCompanies = async (query: GetCompaniesQuery) => {
  const { limit, q } = query;

  return db
    .selectFrom("companies")
    .select(["companyId", "companyName", "companyJurisdiction"])
    .orderBy("companyName")
    .where("companyName", "like", `${q}%`)
    .limit(limit)
    .execute();
};

const getCompaniesResultLength = async (query: GetCompaniesQuery["q"]) => {
  const result = await db
    .selectFrom("companies")
    .select(db.fn.countAll<number>().as("total"))
    .where("companyName", "like", `${query}%`)
    .executeTakeFirstOrThrow();

  return Number(result.total);
};

const getCompany = async (companyId: number) => {
  return db
    .selectFrom("companies")
    .select(["companyId", "companyJurisdiction", "companyName"])
    .where("companyId", "=", companyId)
    .executeTakeFirstOrThrow(() => {
      throw new AppError(404, `Company with id ${companyId} not found.`);
    });
};

const getTitleCompanies = async (titleId: number) => {
  return db
    .selectFrom("companies")
    .innerJoin(
      "titlesCompanies",
      "titlesCompanies.companyId",
      "companies.companyId",
    )
    .select([
      "companies.companyId",
      "companies.companyName",
      "companies.companyJurisdiction",
    ])
    .where("titlesCompanies.titleId", "=", titleId)
    .orderBy("companyName")
    .execute();
};

export const companiesRepo = {
  getCompanies,
  getCompany,
  getTitleCompanies,
  getCompaniesResultLength,
};
