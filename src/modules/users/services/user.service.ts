import { Injectable } from "@nestjs/common";
import { UserDto } from "../dtos/user.dto";
import { UserCreateDto } from "../dtos/user.create.dto";

@Injectable()
export class UserService {

  async create(userCreateDto: UserCreateDto): Promise<void> {

    throw new Error('Algo deu errado ao buscar usuários');
    //
  }

  async update(id: UUID, userCreateDto: UserCreateDto): Promise<UserDto> {
    return null
  }

  async getAll(): Promise<Array<UserDto>> {
    return [new UserDto({ id: 'XX', name: "Alan", idade: 21 }),
    new UserDto({ id: 'YY', name: "XXX", idade: 35 })
    ]
  }

  async getById(id: UUID): Promise<UserDto> {
    return new UserDto({ id: 'YY', name: "XXX", idade: 35 })
  }

  async deleteById(id: UUID): Promise<void> {
    //
  }
}