"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCompanyUseCase = void 0;
const company_entity_1 = require("../../domain/models/company.entity");
const uuid_1 = require("uuid");
class RegisterCompanyUseCase {
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }
    async execute(input) {
        const company = new company_entity_1.Company((0, uuid_1.v4)(), input.cuit, input.name, new Date(), input.type);
        await this.companyRepo.save(company);
    }
}
exports.RegisterCompanyUseCase = RegisterCompanyUseCase;
//# sourceMappingURL=register-company.use-case.js.map