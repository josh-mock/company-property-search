import z from "zod";

export const companySearchQuerySchema = z.object({
  q: z.string().min(3),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const companyTitlesParamsSchema = z.object({
  companyId: z.coerce.number().int().min(1),
});
