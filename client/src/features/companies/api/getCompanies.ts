import { apiClient } from "@/lib/api-client";
import type { GetCompaniesResponse } from "@/lib/types";

export const getCompanies = async (
  query: string,
): Promise<GetCompaniesResponse> => {
  const res = await apiClient.get(`/companies?q=${query}`);
  return res.data;
};
