import z from "zod";

export const addressSearchQuerySchema = z.object({
  q: z.string(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
