import { v4 as uuidv4 } from "uuid";
export class Transfer {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly sourceType: string,
    public readonly amount: number,
    public readonly debitAccount: string,
    public readonly creditAccount: string,
    public readonly date: Date
  ) {}

  static create(props: {
    id?: string;
    sourceId: string;
    sourceType: string;
    amount: number;
    debitAccount: string;
    creditAccount: string;
    date: Date;
  }): Transfer {
    return new Transfer(
      props.id ?? uuidv4(),
      props.sourceId,
      props.sourceType,
      props.amount,
      props.debitAccount,
      props.creditAccount,
      props.date
    );
  }

  static fromPersistence(props: {
    id: string;
    sourceId: string;
    sourceType: string;
    amount: number;
    debitAccount: string;
    creditAccount: string;
    date: Date;
  }): Transfer {
    return new Transfer(
      props.id,
      props.sourceId,
      props.sourceType,
      props.amount,
      props.debitAccount,
      props.creditAccount,
      props.date
    );
  }
}
