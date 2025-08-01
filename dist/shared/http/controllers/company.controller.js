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
const create_company_dto_1 = require("../../../context/company/application/dto/create-company.dto");
const company_entity_1 = require("../../../context/company/domain/models/company.entity");
let CompanyController = class CompanyController {
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }
    async create(dto) {
        const exists = await this.companyRepo.findByCuit(dto.cuit);
        if (exists) {
            throw new common_1.HttpException("Company already exists", common_1.HttpStatus.CONFLICT);
        }
        const company = company_entity_1.Company.create(dto);
        await this.companyRepo.save(company);
    }
    async findAll() {
        return this.companyRepo.findAll();
    }
    async findJoinedInLastMonth() {
        console.log("entroo por el controller");
        return this.companyRepo.findJoinedInLastMonth();
    }
    async findByCuit(cuit) {
        const company = await this.companyRepo.findByCuit(cuit);
        if (!company) {
            throw new common_1.HttpException("Company not found", common_1.HttpStatus.NOT_FOUND);
        }
        return company;
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("recently-joined"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findJoinedInLastMonth", null);
__decorate([
    (0, common_1.Get)(":cuit"),
    __param(0, (0, common_1.Param)("cuit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findByCuit", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)("companies"),
    __param(0, (0, common_1.Inject)("CompanyRepository")),
    __metadata("design:paramtypes", [Object])
], CompanyController);
//# sourceMappingURL=company.controller.js.map