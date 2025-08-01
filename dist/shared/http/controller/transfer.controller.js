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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferController = void 0;
const common_1 = require("@nestjs/common");
const get_companies_with_transfers_use_case_1 = require("../../../context/transfer/application/use-cases/get-companies-with-transfers.use-case");
const transfer_memory_repository_1 = require("../../../context/transfer/infrastructure/repository/transfer.memory.repository");
const register_transfer_use_case_1 = require("../../../context/transfer/application/use-cases/register-transfer.use-case");
const create_transfer_dto_1 = require("../../../context/transfer/application/dto/create-transfer.dto");
const get_all_transfers_use_case_1 = require("../../../context/transfer/application/use-cases/get-all-transfers.use-case");
const composite_source_resolver_1 = require("../../../context/transfer/infrastructure/resolver/composite-source-resolver");
const company_source_resolver_1 = require("../../../context/company/infrastructure/transfer-source/company-source-resolver");
const company_memory_instance_1 = require("../../../context/company/infrastructure/repository/company.memory.instance");
const transferRepo = new transfer_memory_repository_1.TransferMemoryRepository();
const companyRepo = company_memory_instance_1.companyMemoryInstance;
const compositeResolver = new composite_source_resolver_1.CompositeTransferSourceResolver([
    new company_source_resolver_1.CompanyTransferSourceResolver(companyRepo),
]);
const useCase = new get_companies_with_transfers_use_case_1.GetCompaniesWithTransfersUseCase(transferRepo, companyRepo);
let TransferController = class TransferController {
    async getCompaniesWithTransfers() {
        return await useCase.execute();
    }
    async getAllTransfers() {
        const useCase = new get_all_transfers_use_case_1.GetAllTransfersUseCase(transferRepo);
        return await useCase.execute();
    }
    async register(dto) {
        const registerUseCase = new register_transfer_use_case_1.RegisterTransferUseCase(transferRepo, compositeResolver);
        try {
            await registerUseCase.execute(dto);
            return { message: "Transfer registered" };
        }
        catch (error) {
            if (error instanceof Error && error.message.includes("not found")) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error; // otros errores
        }
    }
};
exports.TransferController = TransferController;
__decorate([
    (0, common_1.Get)("companies-in-last-month"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getCompaniesWithTransfers", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getAllTransfers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transfer_dto_1.CreateTransferDto]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "register", null);
exports.TransferController = TransferController = __decorate([
    (0, common_1.Controller)("transfers")
], TransferController);
//# sourceMappingURL=transfer.controller.js.map