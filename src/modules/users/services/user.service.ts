import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "../dtos/user.dto";
import { UserCreateDto } from "../dtos/user.create.dto";
import { UserPostgresqlService } from "@modules/postgresql/services/user.postgresql.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { UserEntity } from "@modules/postgresql/entities/user.entity";
import { NoContentException } from "@common/exceptions/notcontent.exception";
import { InsertResult } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    private readonly userPostgresqlService: UserPostgresqlService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) { }

  async create(userCreateDto: UserCreateDto): Promise<UUID> {
    const userEntity: UserEntity = this.mapper.map(userCreateDto, UserEntity, UserDto);
    const insertResult: InsertResult = await this.userPostgresqlService.insert(userEntity)
    return insertResult.identifiers[0].id
  }

  async update(id: UUID, userCreateDto: UserCreateDto): Promise<UserDto> {
    const repo = this.userPostgresqlService.getRepository()

    const x = await repo
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        ...userCreateDto
      })
      .where('id = :id', { id })
      .execute()

    return this.getById(id)
  }

  async getAll(): Promise<Array<UserDto>> {
    const users: Array<UserEntity> = await this.userPostgresqlService.find()
    return this.mapper.mapArrayAsync(users, UserDto, UserEntity);
  }

  async getById(id: UUID): Promise<UserDto> {
    const user: UserEntity = await this.userPostgresqlService.findOne({ where: { id: id } })
    if (!user) throw new NoContentException();
    return this.mapper.mapAsync(user, UserDto, UserEntity);
  }

  async deleteById(id: UUID): Promise<void> {
    const deleteResult = await this.userPostgresqlService.delete({ id: id })
    if (deleteResult.affected === 0) throw new NotFoundException('Nenhum registro encontrado')
    return
  }
}