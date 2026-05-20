import { useState } from "react";
import axios from "axios";
import { useGetAddresses } from "../hooks/useGetAddresses";
import { Button } from "@/components/ui/button";
import { SearchSuggestionsTable } from "./SearchSuggestionsTable";

export const SearchSuggestions = ({
  query,
  setSelectedTitleNumber,
}: {
  query: string;
  setSelectedTitleNumber: (titleNumber: string) => void;
}) => {
  const { data, isLoading, error } = useGetAddresses(query);
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
          addresses={data.addresses}
          setSelectedTitleNumber={(number) => {
            setSelectedTitleNumber(number);
            setShowSuggestions(false);
          }}
        />
      )}
    </div>
  );
};
