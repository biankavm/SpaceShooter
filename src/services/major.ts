// Os serviços têm como função orquestrar as regras de negócio
// e servir de intermediários entre controladores e modelos

import { PrismaClient, Major } from '@prisma/client';

// o controlador majorController chama o serviço major.ts para se comunicar com o modelo e criar o Major!

const prisma = new PrismaClient();

export const getMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany();
};

export const getMajorById = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } });
};

export const createMajor = async (newMajor: Major): Promise<Major> => {
  return prisma.major.create({ data: newMajor });
};

export const updateMajor = async (
  id: string,
  updatedMajor: Major
): Promise<Major> => {
  return prisma.major.update({
    where: { id },
    data: updatedMajor,
  });
};

export const destroyMajor = async (id: string): Promise<Major> => {
  return await prisma.major.delete({ where: { id } });
};
