"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyMemoryRepository = void 0;
class CompanyMemoryRepository {
    constructor() {
        this.companies = [];
    }
    async save(company) {
        this.companies.push(company);
    }
    async findAll() {
        return [...this.companies];
    }
    async findById(id) {
        return this.companies.find((c) => c.id === id) || null;
    }
    async findByCuit(cuit) {
        return this.companies.find((c) => c.cuit === cuit) || null;
    }
    async findJoinedInLastMonth() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return this.companies.filter((c) => c.joinDate >= oneMonthAgo);
    }
}
exports.CompanyMemoryRepository = CompanyMemoryRepository;
//# sourceMappingURL=company.memory.repository.js.map