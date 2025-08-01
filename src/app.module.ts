import { Module } from "@nestjs/common";
import { CompanyModule } from "./shared/http/modules/company.module";
import { TransferModule } from "./shared/http/modules/transfer.module";
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
