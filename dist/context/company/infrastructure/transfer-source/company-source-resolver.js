"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyTransferSourceResolver = void 0;
class CompanyTransferSourceResolver {
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }
    async resolve(type, id) {
        if (type !== "company")
            return null;
        const company = await this.companyRepo.findById(id);
        return company ? { id: company.id, name: company.name } : null;
    }
}
exports.CompanyTransferSourceResolver = CompanyTransferSourceResolver;
//# sourceMappingURL=company-source-resolver.js.map