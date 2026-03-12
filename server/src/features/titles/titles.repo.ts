import { db } from "@/lib/db/db.js";
import { AppError } from "@/lib/utils/AppError.js";

const getTitle = async (titleNumber: string) => {
  return db
    .selectFrom("titles")
    .select(["titleId", "titleNumber", "titleAddress"])
    .where("titleNumber", "=", titleNumber.toUpperCase())
    .executeTakeFirstOrThrow(() => {
      throw new AppError(404, `Title with number ${titleNumber} not found.`);
    });
};

const getCompanyTitles = async (companyId: number) => {
  return db
    .selectFrom("titles")
    .innerJoin("titlesCompanies", "titlesCompanies.titleId", "titles.titleId")
    .select(["titles.titleId", "titles.titleNumber", "titles.titleAddress"])
    .where("titlesCompanies.companyId", "=", companyId)
    .orderBy("titleNumber")
    .execute();
};

export const titlesRepo = { getCompanyTitles, getTitle };
