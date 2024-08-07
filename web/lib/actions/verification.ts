"use server";

import { getUserByEmail } from "@/data";
import { db } from "@/lib/database";
import { TokenType } from "@prisma/client";

export const verification = async (token: string) => {
  const existingToken = await db.userToken.findFirst({
    where: { token, type: TokenType.VERIFY }
  })
  if (!existingToken) return { error: "Mã xác nhận không tồn tại!" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Mã xác nhận đã hết hạn!" };

  const user = await getUserByEmail(existingToken.email);
  if (!user) return { error: "Không tìm thấy tài khoản!" };

  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.userToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Xác nhận tài khoản thành công!" }
};
