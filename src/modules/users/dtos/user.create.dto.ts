import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, Matches, Max, max, Min } from "class-validator";

export class UserCreateDto {

  constructor(partial?: Partial<UserCreateDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  @Matches(/^[a-zA-ZÀ-ÿ\s]*$/, { message: 'Valor inválidos para o campo nome' })
  @ApiProperty({
    required: true,
  })
  name: string


  @Min(1)
  @Max(120)
  @ApiProperty({
    required: true,
  })
  idade: number
}