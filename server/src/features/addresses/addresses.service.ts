import { addressesRepo } from "./addresses.repo.js";
import type { GetAddressesQuery } from "./addresses.types.js";

const getAddresses = async (query: GetAddressesQuery) => {
  const [addresses, numberOfResults] = await Promise.all([
    addressesRepo.getAddresses(query),
    addressesRepo.getAddressesResultLength(query.q),
  ]);

  return { addresses, numberOfResults };
};

export const addressesService = {
  getAddresses,
};
