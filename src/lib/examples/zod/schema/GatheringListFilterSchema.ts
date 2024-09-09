import { z } from "zod";

// GatheringListFilterSchema 정의
export const GatheringListFilterSchema = z.object({
  search: z.string().min(0).max(50).optional(),
  tagName: z.string().min(0).max(15).optional(),
  location: z.number().min(0).max(16).optional(),
  allowedSex: z.enum(["MALE", "FEMALE", "ALL"]).optional(),
  startAge: z.number().min(20).max(59).optional(),
  endAge: z.number().min(20).max(59).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  sort: z.enum(["", "likes", "views"]).optional(),
  category: z.number().optional(),
  isExclude: z.boolean().optional(),
  page: z.number().min(1).optional(),
});
