"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecentlyJoinedCompaniesUseCase = void 0;
class GetRecentlyJoinedCompaniesUseCase {
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }
    async execute() {
        return this.companyRepo.findJoinedInLastMonth();
    }
}
exports.GetRecentlyJoinedCompaniesUseCase = GetRecentlyJoinedCompaniesUseCase;
//# sourceMappingURL=get-recently-joined-companies.use-case.js.map