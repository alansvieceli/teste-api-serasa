import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class UserDto {

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  id: UUID

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