import * as z from "zod";

export const GatheringFilterSchema = z.object({
  location: z.string(),
  sex: z.string(),
  startAge: z.number(),
  endAge: z.number(),
  mainCategory: z.string(),
  subCategory: z.string(),
});
