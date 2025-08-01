import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("companies")
export class CompanyEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  cuit!: string;

  @Column()
  name!: string;

  @Column({ type: "datetime" })
  joinDate!: Date;

  @Column()
  type!: "PYME" | "CORPORATE";
}
