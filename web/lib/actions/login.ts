"use server";

import { AuthError } from "next-auth";
import * as z from "zod";
import { signIn } from "@/auth";
import { TokenType } from "@prisma/client";
import { LoginSchema } from "@/schema/auth";
import { db } from "@/lib/database";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateTwoFactorToken,
  generateVerificationToken,
  getTokenByMail,
  getUserByEmail,
} from "@/data";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Vui lòng nhập đủ các trường bắt buộc!" };
  const { email, password, code } = validatedFields.data;
  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password)
    return { error: "Tài khoản không tồn tại!" };
  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    await sendVerificationEmail(email, verificationToken.token);
    return { success: "Vui lòng kiểm tra email để xác thực tài khoản!" };
  }

  if (user.isTwoFactorEnabled && user.email) {
    if (code) {
      const twoFactorToken = await getTokenByMail(
        user.email,
        TokenType.TWO_FACTOR
      );
      if (!twoFactorToken || twoFactorToken.token !== code)
        return { error: "Vui lòng nhập mã OTP!" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Mã OTP đã hết hạn!" };

      await db.userToken.delete({
        where: { id: twoFactorToken.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(user.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Không tìm thấy thông tin!" };
        default:
          return { error: "Có lỗi xảy ra!" };
      }
    }

    throw error;
  }
};
