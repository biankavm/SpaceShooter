import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveScoreUser = async (score: number, userId: string) => {
  return prisma.gameSession.create({ data: { score, userId } });
};

export const updateScoreUser = async (score: number, userId: string) => {
  return prisma.gameSession.updateMany({
    where: { userId: userId },
    data: { score },
  });
};

export const getGameSession = async (userId: string) => {
  return prisma.gameSession.findFirst({ where: { userId: userId } });
};

export const getTopScores = async () => {
  return await prisma.gameSession.findMany({
    orderBy: { score: 'desc' },
    take: 10,
  });
};
