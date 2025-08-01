import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty({ example: "20304567891", description: "CUIT de la empresa" })
  @IsString()
  cuit!: string;

  @ApiProperty({ example: "Tech Corp", description: "Nombre de la empresa" })
  @IsString()
  name!: string;

  @ApiProperty({
    example: "2023-01-01",
    description: "Fecha de adhesión",
    required: false,
  })
  @IsOptional()
  joinDate?: Date;

  @ApiProperty({
    enum: ["PYME", "CORPORATE"],
    example: "PYME",
    description: "Tipo de empresa",
  })
  @IsEnum(["PYME", "CORPORATE"])
  type!: "PYME" | "CORPORATE";
}
