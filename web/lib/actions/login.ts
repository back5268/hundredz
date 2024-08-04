"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };
  const { email, password, code } = validatedFields.data;
};
