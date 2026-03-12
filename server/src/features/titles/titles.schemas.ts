import z from "zod";

export const titleCompaniesParamsSchema = z.object({
  titleNumber: z.string().min(1),
});
