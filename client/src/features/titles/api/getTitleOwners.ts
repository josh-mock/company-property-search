import { apiClient } from "@/lib/api-client";
import type { GetTitleCompaniesResponse } from "@/lib/types";

export const getTitleOwners = async (
  titleNumber: string,
): Promise<GetTitleCompaniesResponse> => {
  const res = await apiClient.get(`/titles/${titleNumber}`);
  return res.data;
};
