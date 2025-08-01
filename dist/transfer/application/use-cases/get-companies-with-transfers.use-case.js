"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompaniesWithTransfersUseCase = void 0;
class GetCompaniesWithTransfersUseCase {
    constructor(transferRepo, companyRepo) {
        this.transferRepo = transferRepo;
        this.companyRepo = companyRepo;
    }
    async execute() {
        const transfers = await this.transferRepo.findTransfersInLastMonth();
        const companyIds = new Set(transfers.map((t) => t.companyId));
        const allCompanies = await this.companyRepo.findAll();
        return allCompanies.filter((c) => companyIds.has(c.id));
    }
}
exports.GetCompaniesWithTransfersUseCase = GetCompaniesWithTransfersUseCase;
//# sourceMappingURL=get-companies-with-transfers.use-case.js.map