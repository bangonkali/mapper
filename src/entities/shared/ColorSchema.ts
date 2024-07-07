import { z } from "zod";

export const ColorSchema = z.object({
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
  alpha: z.number().min(0).max(1),
});
