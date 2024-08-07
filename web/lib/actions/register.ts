"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/schema/auth";
import { generateVerificationToken, getUserByEmail } from "@/data";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Vui lòng nhập đủ các trường bắt buộc!" };
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exitingUser = await getUserByEmail(email);
  if (exitingUser) return { error: `Email ${email} đã được sử dụng!` };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);
  return { success: "Vui lòng kiểm tra email để xác thực tài khoản!" };
};
