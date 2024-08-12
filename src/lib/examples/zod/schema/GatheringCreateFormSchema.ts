import { z } from "zod";

export const gatheringCreateFormSchema = z
  .object({
    subCategoryId: z.number().min(1),
    deadline: z.string().refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
      const date = new Date(value.replace(" ", "T") + ":00");
      return !isNaN(date.getTime());
    }, {
    message: "유효한 날짜가 아닙니다.",
  }),
    personCount: z.number().min(2).max(10),
    startAge: z.number().min(1960).max(new Date().getFullYear()),
    endAge: z.number().min(1960).max(new Date().getFullYear()),
    allowedSex: z.union([z.literal("male"), z.literal("female"), z.literal("all")]),
    scheduleStartDate: z.string()
      .refine((value) => {
        if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
        const date = new Date(value.replace(" ", "T") + ":00");
        return !isNaN(date.getTime());
      }, {
        message: "유효한 날짜가 아닙니다.",
      })
      .refine((value) => {
        const date = new Date(value.replace(" ", "T") + ":00");
        return date > new Date();
      }, {
        message: "시작 날짜는 현재 날짜보다 늦어야 합니다.",
      }),

    scheduleEndDate: z.string()
      .refine((value) => {
        if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
        const date = new Date(value.replace(" ", "T") + ":00");
        return !isNaN(date.getTime());
      }, {
        message: "유효한 날짜가 아닙니다.",
      })
      .refine((value) => {
        const date = new Date(value.replace(" ", "T") + ":00");
        return date > new Date();
      }, {
        message: "종료 날짜는 현재 날짜보다 늦어야 합니다.",
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
        message: "종료날짜는 시작날짜보다 같거나 더 늦어야 합니다.",
        code: z.ZodIssueCode.custom,
      });
    }
  });
