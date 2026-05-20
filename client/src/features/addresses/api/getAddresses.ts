import { apiClient } from "@/lib/api-client";
import type { GetAddressesResponse } from "@/lib/types";

export const getAddresses = async (
  query: string,
): Promise<GetAddressesResponse> => {
  const res = await apiClient.get(`/addresses?q=${query}`);
  return res.data;
};
