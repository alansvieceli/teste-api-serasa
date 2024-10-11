import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { UUIDValidationPipe } from "@common/pipes/uuid.validator.pipe";
import { UserCreateDto } from "../dtos/user.create.dto";
import { AuthGuard } from "@nestjs/passport";
import { LocationInterceptor } from "@common/interceptors/location.interceptor";

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
  @UseInterceptors(LocationInterceptor)
  async create(@Body() userCreateDto: UserCreateDto): Promise<UUID> {
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
  @ApiResponse({
    status: 204,
    description: 'Nenhum conteúdo, usuário não encontrado',
  })
  async getById(@Param('id', UUIDValidationPipe) id: UUID): Promise<UserDto | null> {
    return this.userService.getById(id)
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Deleta um usuário pelo ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async deleteById(@Param('id', UUIDValidationPipe) id: UUID): Promise<void> {
    return this.userService.deleteById(id)
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