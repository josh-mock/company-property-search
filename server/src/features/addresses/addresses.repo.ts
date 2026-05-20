import { db } from "@/lib/db/db.js";
import type { GetAddressesQuery } from "./addresses.types.js";

const getAddresses = async (query: GetAddressesQuery) => {
  const { limit, q } = query;

  return db
    .selectFrom("titles")
    .select(["titleId", "titleNumber", "titleAddress"])
    .orderBy("titleAddress")
    .where("titleAddress", "like", `%${q}%`)
    .limit(limit)
    .execute();
};

const getAddressesResultLength = async (query: GetAddressesQuery["q"]) => {
  const result = await db
    .selectFrom("titles")
    .select(db.fn.countAll<number>().as("total"))
    .where("titleAddress", "like", `%${query}%`)
    .executeTakeFirstOrThrow();

  return Number(result.total);
};

export const addressesRepo = {
  getAddresses,
  getAddressesResultLength,
};
