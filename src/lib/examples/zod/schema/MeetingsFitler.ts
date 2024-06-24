import * as z from "zod";

export const MeetingFilterSchema = z.object({
//   rating: z.number().min(1).max(5),
//   season: z.string(),
//   time: z.string(),
//   gender: z.string(),
//   scentRate: z.string(),
//   price: z.string(),
    //   reviewText: z.string().min(20),
    location: z.string(),
    sex: z.string(),
    startAge: z.number(),
    endAge: z.number(),
    mainCategory: z.string(),
    subCategory: z.string(),
});
