import { useGetTitleOwners } from "@/features/titles/hooks/useGetTitleOwners";
import { SearchResult } from "@/features/titles/components/SearchResult";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchSuggestions } from "./SearchSuggestions";

export const AddressSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedTitleNumber, setSelectedTitleNumber] = useState<
    string | undefined
  >(undefined);
  const { data, isLoading } = useGetTitleOwners(selectedTitleNumber || "");

  const reset = () => {
    setQuery("");
    setSelectedTitleNumber(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-3xl">Address Search</h1>

      <SearchBar query={query} setQuery={setQuery} reset={reset} />

      {query.length >= 3 && (
        <SearchSuggestions
          query={query}
          setSelectedTitleNumber={setSelectedTitleNumber}
        />
      )}

      {selectedTitleNumber && !isLoading && data && (
        <SearchResult result={data} />
      )}
    </div>
  );
};
