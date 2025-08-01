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
exports.TransferSqliteRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const transfer_entity_1 = require("../persistence/transfer.entity");
let TransferSqliteRepository = class TransferSqliteRepository {
    constructor(ormRepo) {
        this.ormRepo = ormRepo;
    }
    async save(transfer) {
        const entity = this.ormRepo.create({ ...transfer });
        await this.ormRepo.save(entity);
    }
    async findAll() {
        return this.ormRepo.find();
    }
    async findBySourceId(sourceId) {
        return this.ormRepo.find({ where: { sourceId } });
    }
    async findTransfersInLastMonth() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return this.ormRepo.find({ where: { date: (0, typeorm_1.MoreThan)(oneMonthAgo) } });
    }
};
exports.TransferSqliteRepository = TransferSqliteRepository;
exports.TransferSqliteRepository = TransferSqliteRepository = __decorate([
    __param(0, (0, typeorm_2.InjectRepository)(transfer_entity_1.TransferEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TransferSqliteRepository);
//# sourceMappingURL=transfer.sqlite.repository.js.map