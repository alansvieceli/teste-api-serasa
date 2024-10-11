import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { JwtService } from '@nestjs/jwt';
import { UseLoginrDto } from '../dto/user.login';

describe('TokenController', () => {
  let tokenController: TokenController;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    tokenController = module.get<TokenController>(TokenController);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return an access token when valid user data is provided', async () => {
      const userLoginDto: UseLoginrDto = { id: 123, username: 'john' };

      const result = await tokenController.login(userLoginDto);

      expect(result).toEqual({
        access_token: 'mocked-jwt-token',
      });

      expect(jwtService.sign).toHaveBeenCalledWith({
        userId: userLoginDto.id,
        username: userLoginDto.username,
      });
    });
  });
});
