import { z } from "zod";

export const InformationCommentCreateFormSchema = z.object({
  comment: z
    .string({
      required_error: "Comment is required.",
      invalid_type_error: "Comment must be a string.",
    })
    .min(1, { message: "댓글을 입력해 주세요." })
    .max(200, { message: "댓글 길이는 200자 이하여야 합니다." }),
});
