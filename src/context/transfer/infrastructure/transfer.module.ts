import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransferEntity } from "./persistence/transfer.entity";
import { TransferSqliteRepository } from "./repository/transfer.sqlite.repository";
import { TransferRepository } from "../domain/repository/transfer.repository";
import { GetCompaniesWithTransfersLastMonthUseCase } from "../application/use-cases/get-companies-with-transfers-last-month.use-case";
import { TransferController } from "./http-api/controllers/transfer.controller";
import { CompanyModule } from "../../company/infrastructure/company.module";
import { RegisterTransferUseCase } from "src/context/transfer/application/use-cases/register-transfer.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity]), CompanyModule],
  controllers: [TransferController],
  providers: [
    {
      provide: "TransferRepository",
      useClass: TransferSqliteRepository,
    },
    GetCompaniesWithTransfersLastMonthUseCase,
    RegisterTransferUseCase,
  ],
  exports: [
    "TransferRepository",
    RegisterTransferUseCase,
    GetCompaniesWithTransfersLastMonthUseCase,
  ],
})
export class TransferModule {}
