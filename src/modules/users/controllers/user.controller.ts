import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { UUIDValidationPipe } from "@common/pipes/uuid.validator.pipe";
import { UserCreateDto } from "../dtos/user.create.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller({
  path: 'user',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'criar um usuario',
  })
  async create(@Body() userCreateDto: UserCreateDto): Promise<void> {
    return this.userService.create(userCreateDto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Buscar todos os usuarios',
    type: UserDto,
    isArray: true,
  })
  async getAll(): Promise<Array<UserDto>> {
    return this.userService.getAll()
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: 'Buscar um usuário pelo ID',
    type: UserDto,
    isArray: false,
  })
  async getById(@Param('id', UUIDValidationPipe) id: UUID): Promise<UserDto> {
    return this.userService.getById(id)
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Deleta um usuário pelo ID',
  })
  async deleteById(@Param('id', UUIDValidationPipe) id: UUID): Promise<void> {
    this.userService.deleteById(id)
  }

  @Put(":id")
  @ApiResponse({
    status: 200,
    description: 'Atualizar toda entidade de usuário',
    type: UserDto,
    isArray: false,
  })
  async update(
    @Param('id', UUIDValidationPipe) id: UUID,
    @Body() userDto: UserDto): Promise<UserDto> {
    return this.userService.update(id, userDto)
  }

}