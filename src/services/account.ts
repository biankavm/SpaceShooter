import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export const checkCredentials = async (
  email: string,
  password: string
): Promise<Boolean> => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) return false;

  const isPasswordValid = await compare(password, user.password);
  return isPasswordValid;
};
