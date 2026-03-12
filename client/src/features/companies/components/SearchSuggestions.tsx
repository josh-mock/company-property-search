import { useState } from "react";
import axios from "axios";
import { useGetCompanies } from "../hooks/useGetCompanies";
import { Button } from "@/components/ui/button";
import { SearchSuggestionsTable } from "./SearchSuggestionsTable";

export const SearchSuggestions = ({
  query,
  setSelectedCompanyId,
}: {
  query: string;
  setSelectedCompanyId: (companyId: number) => void;
}) => {
  const { data, isLoading, error } = useGetCompanies(query);
  const [showSuggestions, setShowSuggestions] = useState(true);

  if (error) {
    if (axios.isAxiosError(error)) {
      return <p>{error.response?.data?.message}</p>;
    }
    return <p>Something went wrong</p>;
  }

  if (!data || isLoading || data.numberOfResults === 0) return null;

  return (
    <div className="max-w-4xl w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Suggestions</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSuggestions((v) => !v)}
        >
          {showSuggestions ? "Hide" : "Show"}
        </Button>
      </div>
      {showSuggestions && (
        <SearchSuggestionsTable
          companies={data.companies}
          setSelectedCompanyId={(id) => {
            setSelectedCompanyId(id);
            setShowSuggestions(false);
          }}
        />
      )}
    </div>
  );
};
