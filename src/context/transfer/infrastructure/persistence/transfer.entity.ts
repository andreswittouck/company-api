import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("transfers")
export class TransferEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sourceId!: string;

  @Column()
  sourceType!: string;

  @Column("decimal")
  amount!: number;

  @Column()
  debitAccount!: string;

  @Column()
  creditAccount!: string;

  @Column({ type: "datetime" })
  date!: Date;
}
