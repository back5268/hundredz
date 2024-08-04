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
  if (!validatedFields.success) return { error: "Invalid fields!" };
  if (!token) return { error: "Missing token!" };

  const { password } = validatedFields.data;
  const existingToken = await db.userToken.findFirst({
    where: { token, type: TokenType.FORGOT_PASSWORD },
  });
  if (!existingToken) return { error: "Token does not exist!" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await db.userToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password reset success!" };
};
