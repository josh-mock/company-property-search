import { Button } from "@/components/ui/button";
import type { GetCompanyTitlesResponse } from "@/lib/types";
import { useState } from "react";
import { SearchResultsParagraph } from "./SearchResultsParagraph";
import { SearchResultsTable } from "./SearchResultsTable";

export const SearchResult = ({
  result,
}: {
  result: GetCompanyTitlesResponse;
}) => {
  const [showResults, setShowResults] = useState(true);

  return (
    <div className="max-w-4xl w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Results</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowResults((v) => !v)}
        >
          {showResults ? "Hide" : "Show"}
        </Button>
      </div>
      {showResults && (
        <div>
          <h2 className="font-bold text-xl">Company Search Result</h2>
          <SearchResultsParagraph result={result} />
          <div className="mt-4">
            <SearchResultsTable titles={result.titles} />
          </div>
        </div>
      )}
    </div>
  );
};
