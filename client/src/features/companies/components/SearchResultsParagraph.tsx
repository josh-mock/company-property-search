import type { GetCompanyTitlesResponse } from "@/lib/types";

export const SearchResultsParagraph = ({
  result,
}: {
  result: GetCompanyTitlesResponse;
}) => {
  return (
    <p>
      {result.company.companyName} is registered in{" "}
      {result.company.companyJurisdiction}. It is the registered proprietor of{" "}
      {result.titles.length} titles in the OCOD and CCOD datasets (as at the
      datasets' publication date).
    </p>
  );
};
