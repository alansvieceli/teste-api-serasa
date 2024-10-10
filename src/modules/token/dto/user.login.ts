import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Min } from "class-validator";

export class UseLoginrDto {

  constructor(partial: Partial<UseLoginrDto>) {
    Object.assign(this, partial);
  }

  @Min(1)
  @ApiProperty({
    required: true,
  })
  id: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  username: string


}