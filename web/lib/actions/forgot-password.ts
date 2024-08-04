"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetTokenEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/data";
import { ForgotPasswordSchema } from "@/schema/auth";

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid email!" };
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found!" };
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetTokenEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
