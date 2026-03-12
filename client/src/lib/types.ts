export type Company = {
  companyId: number;
  companyName: string;
  companyJurisdiction: string;
};

export type Title = {
  titleId: number;
  titleNumber: string;
  titleAddress: string;
};

export type GetCompaniesResponse = {
  companies: Company[];
  numberOfResults: number;
};

export type GetCompanyTitlesResponse = {
  company: Company;
  titles: Title[];
};

export type GetTitleCompaniesResponse = {
  title: Title;
  companies: Company[];
};
