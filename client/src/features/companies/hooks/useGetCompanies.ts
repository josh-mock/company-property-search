import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../api/getCompanies";

export const useGetCompanies = (query: string) => {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ["companies", debouncedQuery],
    queryFn: () => getCompanies(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
  });
};
