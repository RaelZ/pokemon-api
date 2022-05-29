import { UserModel } from '../../database/models/UserModel';

export const findByEmailOrCPF = async (email: string, cpf: string) => {
  const user = await UserModel.count({
    where: {
      email,
      cpf,
    },
  });
  return user > 0;
};
