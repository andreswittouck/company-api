import { ApiProperty } from "@nestjs/swagger";

export class CreateTransferDto {
  @ApiProperty()
  sourceId!: string;

  @ApiProperty()
  sourceType!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  debitAccount!: string;

  @ApiProperty()
  creditAccount!: string;

  @ApiProperty()
  date!: Date;
}
