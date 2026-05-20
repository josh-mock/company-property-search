import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../api/getAddresses";

export const useGetAddresses = (query: string) => {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ["addresses", debouncedQuery],
    queryFn: () => getAddresses(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
  });
};
