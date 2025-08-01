"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transfer_entity_1 = require("../../../context/transfer/infrastructure/persistence/transfer.entity");
const transfer_sqlite_repository_1 = require("../../../context/transfer/infrastructure/repository/transfer.sqlite.repository");
const get_companies_with_transfers_last_month_use_case_1 = require("../../../context/transfer/application/use-cases/get-companies-with-transfers-last-month.use-case");
const transfer_controller_1 = require("../../../shared/http/controllers/transfer.controller");
const company_module_1 = require("../modules/company.module");
let TransferModule = class TransferModule {
};
exports.TransferModule = TransferModule;
exports.TransferModule = TransferModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transfer_entity_1.TransferEntity]), company_module_1.CompanyModule],
        controllers: [transfer_controller_1.TransferController],
        providers: [
            {
                provide: "TransferRepository",
                useClass: transfer_sqlite_repository_1.TransferSqliteRepository,
            },
            get_companies_with_transfers_last_month_use_case_1.GetCompaniesWithTransfersLastMonthUseCase,
        ],
    })
], TransferModule);
//# sourceMappingURL=transfer.module.js.map