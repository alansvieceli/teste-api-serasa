import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, Matches, Max, Min } from "class-validator";

export class UserDto {

  constructor(partial?: Partial<UserDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  @Matches(/^[a-zA-ZÀ-ÿ\s]*$/, { message: 'Valor inválidos para o campo nome' })
  @ApiProperty({
    required: true,
  })
  id: UUID

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  name: string

  @AutoMap()
  @Min(1)
  @Max(120)
  @ApiProperty({
    required: true,
  })
  idade: number
}