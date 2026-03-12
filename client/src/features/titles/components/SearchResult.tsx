import type { GetTitleCompaniesResponse } from "@/lib/types";
import { SearchResultsParagraph } from "./SearchResultsParagraph";
import { SearchResultsTable } from "./SearchResultsTable";

export const SearchResult = ({
  result,
}: {
  result: GetTitleCompaniesResponse;
}) => {
  return (
    <div className="max-w-4xl w-full">
      <div>
        <h2 className="font-bold text-xl">Title Search Result</h2>
        <SearchResultsParagraph result={result} />
        <div className="mt-4">
          <SearchResultsTable companies={result.companies} />
        </div>
      </div>
    </div>
  );
};
