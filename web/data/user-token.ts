import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { db } from "@/lib/database";
import { TokenType } from "@prisma/client";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.userToken.findFirst({
    where: { email, type: TokenType.VERIFY },
  });
  if (existingToken)
    await db.userToken.delete({
      where: {
        id: existingToken.id,
      },
    });

  const verificationToken = await db.userToken.create({
    data: {
      email,
      token,
      type: TokenType.VERIFY,
      expires,
    },
  });

  return verificationToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.userToken.findFirst({
    where: { email, type: TokenType.TWO_FACTOR },
  });
  if (existingToken) {
    await db.userToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.userToken.create({
    data: {
      token,
      expires,
      type: TokenType.TWO_FACTOR,
      email,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.userToken.findFirst({
    where: { email, type: TokenType.FORGOT_PASSWORD },
  });
  if (existingToken)
    await db.userToken.delete({
      where: {
        id: existingToken.id,
      },
    });

  const passwordResetToken = await db.userToken.create({
    data: {
      email,
      token,
      type: TokenType.FORGOT_PASSWORD,
      expires,
    },
  });

  return passwordResetToken;
};

export const getTokenByMail = async (email: string, type: TokenType) => {
  try {
    return await db.userToken.findFirst({ where: { email, type } });
  } catch (error) {
    return null;
  }
};
