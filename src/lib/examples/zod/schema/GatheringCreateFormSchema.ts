import { z } from "zod";

export const gatheringCreateFormSchema = z
  .object({
    subCategoryId: z.number(),
    deadline: z.string().refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
      const date = new Date(value.replace(" ", "T") + ":00");
      return !isNaN(date.getTime());
    }),
    participantCount: z.number().min(2).max(10),
    minAgeYear: z.number().min(1960).max(new Date().getFullYear()),
    maxAgeYear: z.number().min(1960).max(new Date().getFullYear()),
    allowedSex: z.union([z.literal("male"), z.literal("female"), z.null()]),
    scheduleStartDate: z.string().refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
      const date = new Date(value.replace(" ", "T") + ":00");
      return !isNaN(date.getTime());
    }),
    scheduleEndDate: z.string().refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
      const date = new Date(value.replace(" ", "T") + ":00");
      return !isNaN(date.getTime());
    }),
    searchId: z.string(),
    placeName: z.string(),
    xAxis: z.string(),
    yAxis: z.string(),
    roadAddressName: z.string(),
    title: z.string(),
    content: z.string().max(500),
    userId: z.string(), // userId 추가
    hashtags: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (data.minAgeYear > data.maxAgeYear) {
      ctx.addIssue({
        path: ["maxAgeYear"],
        message: "maxAgeYear must be greater than or equal to minAgeYear",
        code: z.ZodIssueCode.custom,
      });
    }
  });
