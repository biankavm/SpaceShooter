import { PrismaClient, User } from '@prisma/client';
import { CreateUserDTO, UpdateUserDTO } from '../types/user';
import { genSalt, hash } from 'bcryptjs';
// o controlador majorController chama o serviço major.ts para se comunicar com o modelo e criar o Major!

const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => prisma.user.findMany();

export const createUser = async (newUser: CreateUserDTO): Promise<User> => {
  const salt = await genSalt(parseInt(process.env.SALT_ROUNDS!)); // função do bcryptjs que recebe um parâmetro opcional, que é o número de rounds de hash
  const password = await hash(newUser.password, salt); // faz o hash da senha do usuário passando o salt

  return prisma.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password,
      major: {
        connect: { id: newUser.majorId },
      },
    },
  });
};

export const getUserById = async (id: string): Promise<User | null> =>
  prisma.user.findFirst({ where: { id } });

export const getUserByEmail = async (email: string): Promise<User | null> =>
  prisma.user.findFirst({ where: { email } });

export const updateUser = async (
  id: string,
  updatedUser: UpdateUserDTO
): Promise<User> =>
  prisma.user.update({
    where: { id },
    data: updatedUser,
  });

export const updateUserPassword = async (
  id: string,
  newPassword: string
): Promise<User> => {
  const salt = await genSalt(parseInt(process.env.SALT_ROUNDS!));
  const hashedPassword = await hash(newPassword, salt);

  return prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
};

export const destroyUser = async (id: string): Promise<void> => {
  console.log(`Tentando deletar o usuário com id: ${id}`);

  // // Primeiro deleta todas as sessões de jogo do usuário
  // await prisma.gameSession.deleteMany({
  //   where: { userId: id },
  // });

  // Depois deleta o usuário
  await prisma.user.delete({ where: { id } });
};
