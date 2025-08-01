export class CreateTransferDto {
  sourceId!: string;
  sourceType!: string;
  amount!: number;
  debitAccount!: string;
  creditAccount!: string;
  date!: Date;
}
