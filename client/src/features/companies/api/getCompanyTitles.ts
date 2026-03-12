import { apiClient } from "@/lib/api-client";
import type { GetCompanyTitlesResponse } from "@/lib/types";

export const getCompanyTitles = async (
  id: number,
): Promise<GetCompanyTitlesResponse> => {
  const res = await apiClient.get(`/companies/${id}/titles`);
  return res.data;
};
