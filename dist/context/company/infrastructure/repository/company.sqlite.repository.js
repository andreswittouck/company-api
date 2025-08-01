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
exports.CompanySqliteRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const company_entity_1 = require("../../domain/models/company.entity");
const company_entity_2 = require("../persistence/company.entity");
let CompanySqliteRepository = class CompanySqliteRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    async save(company) {
        const entity = this.ormRepo.create({
            id: company.id,
            name: company.name,
            cuit: company.cuit,
            joinDate: company.joinDate,
            type: company.type,
        });
        await this.ormRepo.save(entity);
    }
    async findById(id) {
        const entity = await this.ormRepo.findOneBy({ id });
        return entity
            ? new company_entity_1.Company(entity.id, entity.cuit, entity.name, entity.joinDate, entity.type)
            : null;
    }
    async findByCuit(cuit) {
        const entity = await this.ormRepo.findOneBy({ cuit });
        return entity
            ? new company_entity_1.Company(entity.id, entity.cuit, entity.name, entity.joinDate, entity.type)
            : null;
    }
    async findJoinedInLastMonth() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        console.log("entrooo");
        const entities = await this.ormRepo.find({
            where: {
                joinDate: (0, typeorm_2.MoreThan)(oneMonthAgo),
            },
        });
        return entities.map((e) => new company_entity_1.Company(e.id, e.cuit, e.name, e.joinDate, e.type));
    }
    async findAll() {
        const entities = await this.ormRepo.find();
        return entities.map((e) => new company_entity_1.Company(e.id, e.cuit, e.name, e.joinDate, e.type));
    }
};
exports.CompanySqliteRepository = CompanySqliteRepository;
exports.CompanySqliteRepository = CompanySqliteRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_2.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanySqliteRepository);
//# sourceMappingURL=company.sqlite.repository.js.map