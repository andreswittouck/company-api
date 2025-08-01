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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const create_company_dto_1 = require("../../../company/application/dto/create-company.dto");
const register_company_use_case_1 = require("../../../company/application/use-cases/register-company.use-case");
const get_recently_joined_companies_use_case_1 = require("../../../company/application/use-cases/get-recently-joined-companies.use-case");
const company_memory_repository_1 = require("../../../company/infrastructure/repository/company.memory.repository");
const companyRepo = new company_memory_repository_1.CompanyMemoryRepository();
let CompanyController = class CompanyController {
    async register(dto) {
        const useCase = new register_company_use_case_1.RegisterCompanyUseCase(companyRepo);
        await useCase.execute(dto);
        return { message: "Company registered" };
    }
    async getRecentlyJoined() {
        const useCase = new get_recently_joined_companies_use_case_1.GetRecentlyJoinedCompaniesUseCase(companyRepo);
        return await useCase.execute();
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("recently-joined"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getRecentlyJoined", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)("companies")
], CompanyController);
//# sourceMappingURL=company.controller.js.map