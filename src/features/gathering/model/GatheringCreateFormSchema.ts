import { z } from "zod";

export const GatheringCreateFormSchema = z
  .object({
    gatheringCategoryId: z.number().min(1, { message: "카테고리가 없습니다." }),
    deadline: z
      .string()
      .refine(
        (value) => {
          if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
          const date = new Date(value.replace(" ", "T") + ":00");
          return !isNaN(date.getTime());
        },
        {
          message: "유효한 날짜가 아닙니다.",
        },
      )
      .refine(
        (value) => {
          const date = new Date(value.replace(" ", "T") + ":00");
          return date >= new Date();
        },
        {
          message: "마감일은 현재날짜와 같거나 늦어야 합니다.",
        },
      ),
    personCount: z.number().min(2).max(10),
    startAge: z.number().min(1960).max(new Date().getFullYear()),
    endAge: z.number().min(1960).max(new Date().getFullYear()),
    allowedSex: z
      .string()
      .refine((value) => ["MALE", "FEMALE", "ALL"].includes(value), {
        message: "모임 인원, 나이, 성별을 선택해야 합니다.",
      }),
    scheduleStartDate: z
      .string()
      .min(1, { message: "날짜를 추가해야 합니다." })
      .refine(
        (value) => {
          if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
          const date = new Date(value.replace(" ", "T") + ":00");
          return !isNaN(date.getTime());
        },
        {
          message: "유효한 날짜가 아닙니다.",
        },
      )
      .refine(
        (value) => {
          const date = new Date(value.replace(" ", "T") + ":00");
          return date >= new Date();
        },
        {
          message: "시작날짜는 현재날짜보다 늦어야 합니다.",
        },
      ),
    scheduleEndDate: z
      .string()
      .min(1, { message: "마감일을 정해야 합니다." })
      .refine(
        (value) => {
          if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
          const date = new Date(value.replace(" ", "T") + ":00");
          return !isNaN(date.getTime());
        },
        {
          message: "유효한 날짜가 아닙니다.",
        },
      )
      .refine(
        (value) => {
          const date = new Date(value.replace(" ", "T") + ":00");
          return date > new Date();
        },
        {
          message: "종료 날짜는 현재 날짜보다 늦어야 합니다.",
        },
      ),
    placeName: z.string().min(1, { message: "장소를 등록해야 합니다." }),
    xAxis: z.number(),
    yAxis: z.number(),
    roadAddressName: z.string().min(1),
    title: z.string().min(1, { message: "1글자 이상은 입력해야 합니다." }),
    openChattingUrl: z
      .string()
      .min(1, { message: "1글자 이상은 입력해야 합니다." })
      .max(255, { message: "최대 255글자 입니다." }),
    content: z
      .string()
      .min(1, { message: "1글자 이상은 입력해야 합니다." })
      .max(500),
    // hashtags: z.array(z.string())
  })
  .superRefine((data, ctx) => {
    const scheduleStartDate = new Date(
      data.scheduleStartDate.replace(" ", "T") + ":00",
    );
    const scheduleEndDate = new Date(
      data.scheduleEndDate.replace(" ", "T") + ":00",
    );
    const deadline = new Date(data.deadline.replace(" ", "T") + ":00");

    // 1. scheduleStartDate는 scheduleEndDate보다 빨라야 함
    if (scheduleStartDate >= scheduleEndDate) {
      ctx.addIssue({
        path: ["scheduleStartDate"],
        message: "시작 날짜는 종료 날짜보다 빨라야 합니다.",
        code: z.ZodIssueCode.custom,
      });
    }

    // 2. deadline은 scheduleStartDate보다 빨라야 함
    if (deadline >= scheduleStartDate) {
      ctx.addIssue({
        path: ["deadline"],
        message: "마감일은 시작 날짜보다 빨라야 합니다.",
        code: z.ZodIssueCode.custom,
      });
    }
  });
