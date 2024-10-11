import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserDto } from '../dtos/user.dto';
import { UUIDValidationPipe } from '@common/pipes/uuid.validator.pipe';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn().mockResolvedValue([new UserDto()]),
            getById: jest.fn().mockResolvedValue(new UserDto()),
            deleteById: jest.fn(),
            update: jest.fn().mockResolvedValue(new UserDto()),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should call userService.create with the correct parameters', async () => {
      const dto = new UserCreateDto();
      await userController.create(dto);
      expect(userService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await userController.getAll();
      expect(result).toBeInstanceOf(Array);
      expect(userService.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a user by ID', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const result = await userController.getById(uuid);
      expect(result).toBeInstanceOf(UserDto);
      expect(userService.getById).toHaveBeenCalledWith(uuid);
    });
  });

  describe('deleteById', () => {
    it('should call userService.deleteById with the correct ID', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      await userController.deleteById(uuid);
      expect(userService.deleteById).toHaveBeenCalledWith(uuid);
    });
  });

  describe('update', () => {
    it('should update a user with the correct data', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const dto = new UserDto();
      const result = await userController.update(uuid, dto);
      expect(result).toBeInstanceOf(UserDto);
      expect(userService.update).toHaveBeenCalledWith(uuid, dto);
    });
  });
});
