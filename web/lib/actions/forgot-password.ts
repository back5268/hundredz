"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetTokenEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/data";
import { ForgotPasswordSchema } from "@/schema/auth";

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Vui lòng nhập đủ các trường bắt buộc!" };
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: `Không tìm thấy tài khoản có email ${email}` };
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetTokenEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Vui lòng kiểm tra email để xác nhận!" };
};
