import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity } from "./persistence/company.entity";
import { CompanySqliteRepository } from "./repository/company.sqlite.repository";
import { CompanyController } from "./http-api/controllers/company.controller";
import { RegisterCompanyUseCase } from "src/context/company/application/use-cases/register-company.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [
    RegisterCompanyUseCase,
    {
      provide: "CompanyRepository",
      useClass: CompanySqliteRepository,
    },
  ],
  exports: ["CompanyRepository", RegisterCompanyUseCase],
})
export class CompanyModule {}
