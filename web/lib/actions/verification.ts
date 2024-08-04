"use server";

import { getUserByEmail } from "@/data";
import { db } from "@/lib/database";
import { TokenType } from "@prisma/client";

export const verification = async (token: string) => {
  const existingToken = await db.userToken.findFirst({
    where: { token, type: TokenType.VERIFY }
  })
  if (!existingToken) return { error: "Token does not exist!" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const user = await getUserByEmail(existingToken.email);
  if (!user) return { error: "Email does not exist!" };

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

  return { success: "Email verified!" }
};
