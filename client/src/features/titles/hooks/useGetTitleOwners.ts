import { useQuery } from "@tanstack/react-query";
import { getTitleOwners } from "../api/getTitleOwners";

export const useGetTitleOwners = (titleNumber: string) => {
  return useQuery({
    queryKey: ["title", titleNumber],
    queryFn: () => getTitleOwners(titleNumber),
    enabled: !!titleNumber,
    retry: false,
  });
};
