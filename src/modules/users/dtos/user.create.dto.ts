import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Max, max, Min } from "class-validator";

export class UserCreateDto {

  constructor(partial?: Partial<UserCreateDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  @IsString()
  @IsNotEmpty()
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