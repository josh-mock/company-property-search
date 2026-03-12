import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useGetCompanies } from "@/features/companies/hooks/useGetCompanies";
import { Search } from "lucide-react";

export const SearchBar = ({
  query,
  setQuery,
  reset,
}: {
  query: string;
  setQuery: (q: string) => void;
  reset: () => void;
}) => {
  const { data, isLoading } = useGetCompanies(query);

  return (
    <div className="flex items-center gap-2">
      <InputGroup className="w-xs">
        <InputGroupInput
          placeholder="Search company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        {query.length >= 3 && !isLoading && data && (
          <InputGroupAddon align="inline-end">
            {data.numberOfResults > 10 ? "10+" : data.numberOfResults}{" "}
            {data.numberOfResults === 1 ? "result" : "results"}
          </InputGroupAddon>
        )}
      </InputGroup>
      <Button variant="outline" size="sm" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};
