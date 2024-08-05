import { z } from "zod";

export const gatheringCreateFormSchema = z
  .object({
    subCategoryId: z.number().min(1),
    deadline: z.string().refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
      const date = new Date(value.replace(" ", "T") + ":00");
      return !isNaN(date.getTime());
    }),
    personCount: z.number().min(2).max(10),
    startAge: z.number().min(1960).max(new Date().getFullYear()),
    endAge: z.number().min(1960).max(new Date().getFullYear()),
    allowedSex: z.union([z.literal("male"), z.literal("female"), z.literal("all")]),
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
    placeName: z.string().min(1),
    xAxis: z.string().min(1),
    yAxis: z.string().min(1),
    roadAddressName: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1).max(500),
    hashtags: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (data.startAge < data.endAge) {
      ctx.addIssue({
        path: ["endAge"],
        message: "endAge must be less than or equal to startAge",
        code: z.ZodIssueCode.custom,
      });
    }
  });
