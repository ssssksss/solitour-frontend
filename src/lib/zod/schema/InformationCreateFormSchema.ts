import { z } from "zod";

export const InformationCreateFormSchema = z.object({
  userId: z
    .number({
      required_error: "UserId is required.",
      invalid_type_error: "UserId must be a integer.",
    })
    .int()
    .positive(),
  informationTitle: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string.",
    })
    .min(1),
  informationAddress: z
    .string({
      required_error: "Address is required.",
      invalid_type_error: "Address must be a string.",
    })
    .min(1),
  province: z
    .string({
      required_error: "Province is required.",
      invalid_type_error: "Province must be a string.",
    })
    .min(1),
  city: z
    .string({
      required_error: "City is required.",
      invalid_type_error: "City must be a string.",
    })
    .min(1),
  placeId: z
    .string({
      required_error: "PlaceId is required.",
      invalid_type_error: "PlaceId must be a string.",
    })
    .min(1),
  placeXAxis: z
    .string({
      required_error: "PlaceXAxis is required.",
      invalid_type_error: "PlaceXAxis must be a string.",
    })
    .min(1),
  placeYAxis: z
    .string({
      required_error: "PlaceYAxis is required.",
      invalid_type_error: "PlaceYAxis must be a string.",
    })
    .min(1),
  placeName: z
    .string({
      required_error: "PlaceName is required.",
      invalid_type_error: "PlaceName must be a string.",
    })
    .min(1),
  category: z
    .string({
      required_error: "Category is required.",
      invalid_type_error: "Category must be a string.",
    })
    .min(1),
  subCategory: z
    .string({
      required_error: "SubCategory is required.",
      invalid_type_error: "SubCategory must be a string.",
    })
    .min(1),
  thumbnailImage: z.custom<File>((file) => file instanceof File, {
    message: "Expected a File",
  }),
  contentImages: z
    .custom<File>((file) => file instanceof File, {
      message: "Expected a File",
    })
    .array()
    .optional(),
  informationContent: z
    .string({
      required_error: "Content is required.",
      invalid_type_error: "Content must be a string.",
    })
    .min(1)
    .max(500, { message: "Must be 500 or fewer characters long" }),
  hashtags: z
    .string({
      required_error: "Hashtag is required.",
      invalid_type_error: "Hashtag must be a string.",
    })
    .array()
    .min(1),
  tips: z
    .string({
      required_error: "Tip is required.",
      invalid_type_error: "Tip must be a string.",
    })
    .array()
    .min(1),
});
