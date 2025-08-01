import { ApiProperty } from "@nestjs/swagger";

export class CompanyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  cuit!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  joinDate!: Date;

  @ApiProperty({ enum: ["PYME", "CORPORATE"] })
  type!: "PYME" | "CORPORATE";
}
