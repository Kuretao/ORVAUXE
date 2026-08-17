import { z } from "zod";

const optionalTrimmed = (maximum: number) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().min(1).max(maximum).optional(),
  );

export const projectInquirySchema = z
  .object({
    submissionId: z.string().uuid(),
    turnstileVerificationId: z.string().uuid(),
    turnstileToken: z.string().trim().min(1).max(4096),
    name: z.string().trim().min(2).max(100),
    email: z
      .string()
      .trim()
      .email()
      .max(254)
      .transform((value) => value.toLowerCase()),
    companyName: optionalTrimmed(120),
    companyWebsite: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().url().max(2048).optional(),
    ),
    serviceInterest: z.enum(["edition", "atelier"]),
    editionSlug: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(100)
        .optional(),
    ),
    budgetRange: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.enum(["under_10k", "10k_25k", "25k_50k", "50k_plus", "undecided"]).optional(),
    ),
    inquiryMessage: z.string().trim().min(10).max(4000),
    sourceContext: z.literal("start-a-project"),
  })
  .strict()
  .transform((data) => {
    if (data.serviceInterest === "edition" || !data.editionSlug) return data;
    return { ...data, editionSlug: undefined };
  });

export type ParsedProjectInquiry = z.infer<typeof projectInquirySchema>;
