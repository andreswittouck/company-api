import { Module } from "@nestjs/common";
import { CompanyModule } from "./context/company/infrastructure/company.module";
import { TransferModule } from "./context/transfer/infrastructure/transfer.module";
import { AppDataSource } from "./database/data-sourse";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    CompanyModule,
    TransferModule,
  ],
})
export class AppModule {}
