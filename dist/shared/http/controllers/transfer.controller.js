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
const create_transfer_dto_1 = require("../../../context/transfer/application/dto/create-transfer.dto");
const transfer_entity_1 = require("../../../context/transfer/domain/models/transfer.entity");
const get_companies_with_transfers_last_month_use_case_1 = require("../../../context/transfer/application/use-cases/get-companies-with-transfers-last-month.use-case");
let TransferController = class TransferController {
    constructor(transferRepo, getCompaniesWithTransfersLastMonthUseCase) {
        this.transferRepo = transferRepo;
        this.getCompaniesWithTransfersLastMonthUseCase = getCompaniesWithTransfersLastMonthUseCase;
    }
    async register(dto) {
        const transfer = transfer_entity_1.Transfer.create(dto);
        await this.transferRepo.save(transfer);
    }
    async getAll() {
        return this.transferRepo.findAll();
    }
    async getTransfersInLastMonth() {
        return this.transferRepo.findTransfersInLastMonth();
    }
    async getBySource(sourceId) {
        return this.transferRepo.findBySourceId(sourceId);
    }
    getCompaniesWithTransfers() {
        return this.getCompaniesWithTransfersLastMonthUseCase.execute();
    }
};
exports.TransferController = TransferController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transfer_dto_1.CreateTransferDto]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("recent"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getTransfersInLastMonth", null);
__decorate([
    (0, common_1.Get)("by-source/:sourceId"),
    __param(0, (0, common_1.Body)("sourceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getBySource", null);
__decorate([
    (0, common_1.Get)("companies-in-last-month"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransferController.prototype, "getCompaniesWithTransfers", null);
exports.TransferController = TransferController = __decorate([
    (0, common_1.Controller)("transfers"),
    __param(0, (0, common_1.Inject)("TransferRepository")),
    __metadata("design:paramtypes", [Object, get_companies_with_transfers_last_month_use_case_1.GetCompaniesWithTransfersLastMonthUseCase])
], TransferController);
//# sourceMappingURL=transfer.controller.js.map