import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CompanyEntity } from "../../../context/company/infrastructure/persistence/company.entity";
import { CompanySqliteRepository } from "../../../context/company/infrastructure/repository/company.sqlite.repository";
import { CompanyRepository } from "../../../context/company//domain/repository/company.repository";
import { GetCompaniesJoinedLastMonthUseCase } from "../../../context/company//application/use-cases/get-companies-joined-last-month.use-case";
import { CompanyController } from "../../../shared/http/controllers/company.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [
    {
      provide: "CompanyRepository",
      useClass: CompanySqliteRepository,
    },
  ],
  exports: ["CompanyRepository"],
})
export class CompanyModule {}
