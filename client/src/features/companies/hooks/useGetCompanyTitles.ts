import { useQuery } from "@tanstack/react-query";
import { getCompanyTitles } from "../api/getCompanyTitles";

export const useGetCompanyTitles = (id?: number) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompanyTitles(id!),
    enabled: !!id,
  });
};
