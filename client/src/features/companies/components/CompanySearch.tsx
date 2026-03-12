import { useGetCompanyTitles } from "@/features/companies/hooks/useGetCompanyTitles";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";
import { SearchSuggestions } from "./SearchSuggestions";

export const CompanySearch = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    number | undefined
  >(undefined);
  const { data, isLoading } = useGetCompanyTitles(selectedCompanyId);

  const reset = () => {
    setQuery("");
    setSelectedCompanyId(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-3xl">Company Search</h1>

      <SearchBar query={query} setQuery={setQuery} reset={reset} />

      {query.length >= 3 && (
        <SearchSuggestions
          query={query}
          setSelectedCompanyId={setSelectedCompanyId}
        />
      )}

      {selectedCompanyId && !isLoading && data && (
        <SearchResult result={data} />
      )}
    </div>
  );
};
