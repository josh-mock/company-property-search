import { z } from "zod";
import { addressSearchQuerySchema } from "./addresses.schemas.js";

export type GetAddressesQuery = z.infer<typeof addressSearchQuerySchema>;
