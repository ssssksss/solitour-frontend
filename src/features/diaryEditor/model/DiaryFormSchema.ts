import { z } from "zod";

export const DiaryFormSchema = z.object({
  title: z
    .string({
      required_error: "제목을 입력해 주세요.",
      invalid_type_error: "Title must be a string.",
    })
    .min(1, { message: "제목을 입력해 주세요." })
    .max(50, { message: "제목 길이는 50자 이하여야 합니다." }),
  startDate: z
    .date({
      required_error: "날짜를 입력해 주세요.",
      invalid_type_error: "startDate must be a date.",
    })
    .min(new Date("1970-01-01"), {
      message: "1970년 이후의 날짜만 입력할 수 있습니다.",
    }),
  endDate: z
    .date({
      required_error: "날짜를 입력해 주세요.",
      invalid_type_error: "날짜를 입력해 주세요.",
    })
    .max(new Date(new Date().getTime() + 1000 * 60 * 60 * 24), {
      message: "미래에 해당하는 날짜는 입력할 수 없습니다.",
    }),
  address: z
    .string({
      required_error: "주소를 입력해 주세요.",
      invalid_type_error: "Address must be a string.",
    })
    .min(1, { message: "주소를 입력해 주세요." }),
  image: z.string({
    required_error: "최소 1장의 이미지를 등록해 주세요.",
    invalid_type_error: "Image must be a string.",
  }),
  moodLevels: z
    .number({
      required_error: "기분을 선택해 주세요.",
      invalid_type_error: "MoodLevel must be a integer.",
    })
    .int({ message: "기분을 선택해 주세요." })
    .positive({ message: "기분을 선택해 주세요." }),
  contents: z.string({
    required_error: "내용을 입력해 주세요.",
    invalid_type_error: "Content must be a string.",
  }),
});
