"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferController = void 0;
const common_1 = require("@nestjs/common");
const get_companies_with_transfers_use_case_1 = require("../../../transfer/application/use-cases/get-companies-with-transfers.use-case");
const transfer_memory_repository_1 = require("../../../transfer/infrastructure/repository/transfer.memory.repository");
const company_memory_repository_1 = require("../../../company/infrastructure/repository/company.memory.repository");
const transferRepo = new transfer_memory_repository_1.TransferMemoryRepository();
const companyRepo = new company_memory_repository_1.CompanyMemoryRepository();
const useCase = new get_companies_with_transfers_use_case_1.GetCompaniesWithTransfersUseCase(transferRepo, companyRepo);
let TransferController = class TransferController {
    async getCompaniesWithTransfers() {
        return await useCase.execute();
    }
};
exports.TransferController = TransferController;
__decorate([
    (0, common_1.Get)("companies-in-last-month"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getCompaniesWithTransfers", null);
exports.TransferController = TransferController = __decorate([
    (0, common_1.Controller)("transfers")
], TransferController);
//# sourceMappingURL=transfer.controller.js.map