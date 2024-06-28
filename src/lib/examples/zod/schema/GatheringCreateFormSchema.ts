import { z } from "zod";

export const gatheringCreateFormSchema = z
  .object({
    title: z.string(),
    content: z.string().max(500),
    hashtag: z.string(),
    expirationDate: z.string().refine(value => {
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
    const date = new Date(value.replace(' ', 'T') + ':00');
    return !isNaN(date.getTime());
}),
    placeName: z.string(),
    placeSearchId: z.string(),
    placeXAxis: z.string(),
    placeYAxis: z.string(),
    placeAddress: z.string(),
    placeUrl: z.string(),
    mainCategory: z.number(),
    subCategory: z.number(),
    startDateTime: z.string().refine(value => {
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
    const date = new Date(value.replace(' ', 'T') + ':00');
    return !isNaN(date.getTime());
}),
    endDateTime: z.string().refine(value => {
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) return false;
    const date = new Date(value.replace(' ', 'T') + ':00');
    return !isNaN(date.getTime());
}),
    totalPersonCount: z.number().min(1).max(10),
    permitSex: z.union([z.literal("man"), z.literal("woman"), z.null()]),
    permitMinUserAgeYear: z.number().min(1960).max(new Date().getFullYear()),
    permitMaxUserAgeYear: z.number().min(1960).max(new Date().getFullYear()),
  })
  .superRefine((data, ctx) => {
    if (data.permitMinUserAgeYear > data.permitMaxUserAgeYear) {
      ctx.addIssue({
        path: ["permitMaxUserAgeYear"],
        message:
          "permitMaxUserAgeYear must be greater than or equal to permitMinUserAgeYear",
        code: z.ZodIssueCode.custom,
      });
    }
  });
