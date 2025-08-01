export class CreateTransferDto {
  id!: string;
  sourceId!: string;
  sourceType!: string;
  amount!: number;
  debitAccount!: string;
  creditAccount!: string;
  date!: Date;
}
