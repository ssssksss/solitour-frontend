import { z } from "zod";

export const InformationUpdateFormSchema = z.object({
  userId: z
    .number({
      required_error: "로그인을 해야 정보 등록이 가능합니다.",
      invalid_type_error: "UserId must be a integer.",
    })
    .int()
    .positive(),
  informationTitle: z
    .string({
      required_error: "제목을 입력해 주세요.",
      invalid_type_error: "Title must be a string.",
    })
    .min(1, { message: "제목을 입력해 주세요." })
    .max(50, { message: "제목 길이는 50자 이하여야 합니다." }),
  informationAddress: z
    .string({
      required_error: "Address is required.",
      invalid_type_error: "Address must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." })
    .max(50, { message: "장소 길이는 50자 이하여야 합니다." }),
  province: z
    .string({
      required_error: "Province is required.",
      invalid_type_error: "Province must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." }),
  city: z
    .string({
      required_error: "City is required.",
      invalid_type_error: "City must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." }),
  placeId: z
    .string({
      required_error: "PlaceId is required.",
      invalid_type_error: "PlaceId must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." }),
  placeXAxis: z
    .string({
      required_error: "PlaceXAxis is required.",
      invalid_type_error: "PlaceXAxis must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." }),
  placeYAxis: z
    .string({
      required_error: "PlaceYAxis is required.",
      invalid_type_error: "PlaceYAxis must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." }),
  placeName: z
    .string({
      required_error: "PlaceName is required.",
      invalid_type_error: "PlaceName must be a string.",
    })
    .min(1, { message: "장소를 입력해 주세요." }),
  categoryId: z
    .number({
      required_error: "Category is required.",
      invalid_type_error: "Category must be an integer.",
    })
    .int()
    .positive({ message: "카테고리를 선택해 주세요." }),
  newThumbNailUrl: z
    .string({
      required_error: "newThumbNailUrl is required.",
      invalid_type_error: "newThumbNailUrl must be a string.",
    })
    .nullable(),
  newThumbNailFromContent: z
    .string({
      required_error: "newThumbNailFromContent is required.",
      invalid_type_error: "newThumbNailFromContent must be a string.",
    })
    .nullable(),
  moveThumbNailToContent: z
    .string({
      required_error: "moveThumbNailToContent is required.",
      invalid_type_error: "moveThumbNailToContent must be a string.",
    })
    .nullable(),
  newContentImagesUrl: z
    .string({
      required_error: "newContentImagesUrl is required.",
      invalid_type_error: "newContentImagesUrl must be a string.",
    })
    .array(),
  deleteImagesUrl: z
    .string({
      required_error: "deleteImagesUrl is required.",
      invalid_type_error: "deleteImagesUrl must be a string.",
    })
    .array(),
  informationContent: z.string({
    required_error: "Content is required.",
    invalid_type_error: "Content must be a string.",
  }),
  hashtags: z
    .string({
      required_error: "Hashtag is required.",
      invalid_type_error: "Hashtag must be a string.",
    })
    .array()
    .min(1, { message: "최소 하나의 태그를 입력해 주세요." }),
  tips: z
    .string({
      required_error: "Tip is required.",
      invalid_type_error: "Tip must be a string.",
    })
    .min(1, { message: "최소 하나의 Tip을 입력해 주세요." })
    .array()
    .min(1, { message: "최소 하나의 Tip을 입력해 주세요." }),
});
