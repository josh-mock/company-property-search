import { Selectable } from "kysely";

export interface Database {
  companies: CompaniesTable;
  titles: TitlesTable;
  titlesCompanies: TitlesCompaniesTable;
}

export interface CompaniesTable {
  companyId: number;
  companyName: string;
  companyJurisdiction: string;
}

export type Company = Selectable<CompaniesTable>;

export interface TitlesTable {
  titleId: number;
  titleNumber: string;
  titleAddress: string;
}

export type Title = Selectable<TitlesTable>;

export interface TitlesCompaniesTable {
  titleId: number;
  companyId: number;
}

export type TitleCompany = Selectable<TitlesCompaniesTable>;
