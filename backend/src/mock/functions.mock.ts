/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<any> = jest.fn(() => ({
  save: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn().mockReturnThis(),
  findOneOrFail: jest.fn(),
  find: jest.fn().mockReturnThis(),

  createQueryBuilder: jest.fn(() => repositoryMockFactory().queryBuilder),

  queryBuilder: {
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    execute: jest.fn().mockReturnThis(),
  },
}));
