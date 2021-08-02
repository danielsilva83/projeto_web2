import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from '../users/entities/user.repository';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('should validates and returns the user based on JWT payload', async () => {
      const user = new User();
      user.email = 'dev.lab@temrazao.com';

      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({
        email: 'dev.lab@temrazao.com',
      });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        email: 'dev.lab@temrazao.com',
      });
      expect(result).toEqual(user);
    });

    it('should throws an unauthorized exception as user cannot be found', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(
        jwtStrategy.validate({ email: 'dev.lab@temrazao.com' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
