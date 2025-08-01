import { DataSource } from "typeorm";
import { CompanyEntity } from "../context/company/infrastructure/persistence/company.entity";
import { TransferEntity } from "../context/transfer/infrastructure/persistence/transfer.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true, // solo para dev
  entities: [CompanyEntity, TransferEntity],
});
