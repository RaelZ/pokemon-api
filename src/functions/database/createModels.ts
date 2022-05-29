import { models, modelsFK } from '../../database/models';

export const createModels = async () => {
  await Promise.all(models.map((model) => model.sync({ alter: true }))).then(
    async () =>
      await Promise.all(modelsFK.map((model) => model.sync({ alter: true })))
  );
};
