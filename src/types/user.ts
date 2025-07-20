import { User } from '@prisma/client';

export type CreateUserDTO = Pick<
  User,
  'name' | 'email' | 'password' | 'majorId'
>;

export type UpdateUserDTO = Pick<User, 'name' | 'email' | 'majorId'>;
