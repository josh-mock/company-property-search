import type { GetTitleCompaniesResponse } from "@/lib/types";

export const SearchResultsParagraph = ({
  result,
}: {
  result: GetTitleCompaniesResponse;
}) => {
  return (
    <p>
      {result.title.titleNumber} comprises {result.title.titleAddress}. It has{" "}
      {result.companies.length} proprietors in the OCOD and CCOD datasets (as at
      the datasets' publication date).
    </p>
  );
};
