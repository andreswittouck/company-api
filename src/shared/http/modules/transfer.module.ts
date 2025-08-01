import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransferEntity } from "../../../context/transfer/infrastructure/persistence/transfer.entity";
import { TransferSqliteRepository } from "../../../context/transfer/infrastructure/repository/transfer.sqlite.repository";
import { TransferRepository } from "../../../context/transfer/domain/repository/transfer.repository";
import { GetCompaniesWithTransfersLastMonthUseCase } from "../../../context/transfer/application/use-cases/get-companies-with-transfers-last-month.use-case";
import { TransferController } from "../../../shared/http/controllers/transfer.controller";
import { CompanyModule } from "../modules/company.module";

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity]), CompanyModule],
  controllers: [TransferController],
  providers: [
    {
      provide: "TransferRepository",
      useClass: TransferSqliteRepository,
    },
    GetCompaniesWithTransfersLastMonthUseCase,
  ],
})
export class TransferModule {}
