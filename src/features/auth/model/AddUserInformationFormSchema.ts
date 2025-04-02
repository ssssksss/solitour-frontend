import { z } from "zod";

const currentYear = new Date().getFullYear();

// 유저 추가정보 받을 떄 유효성 검사
export const AddUserInformationFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름은 1글자 이상이어야 합니다." })
    .max(10, { message: "이름은 10글자 이하이어야 합니다." }),
  age: z
    .number()
    .min(currentYear - 58, {
      message: "나이는 59세까지 허용됩니다.",
    })
    .max(currentYear - 19, { message: "나이는 20살 이상이어야 합니다." }),
  sex: z.string().min(1, { message: "성별은 선택은 필수입니다." }),
});
