"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { db } from "../database";
import { NewPasswordSchema } from "@/schema/auth";
import { TokenType } from "@prisma/client";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Vui lòng nhập đủ các trường bắt buộc!" };
  if (!token) return { error: "Không tìm thấy token!" };

  const { password } = validatedFields.data;
  const existingToken = await db.userToken.findFirst({
    where: { token, type: TokenType.FORGOT_PASSWORD },
  });
  if (!existingToken) return { error: "Mã token không tồn tại!" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Mã token đã hết hạn!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Không tìm thấy tài khoản!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await db.userToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Xác nhận mật khẩu mới thành công!" };
};
