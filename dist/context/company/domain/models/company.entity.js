"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
class Company {
    constructor(id, cuit, name, joinDate, type) {
        this.id = id;
        this.cuit = cuit;
        this.name = name;
        this.joinDate = joinDate;
        this.type = type;
    }
    static create(dto) {
        return new Company(dto.id ?? crypto.randomUUID(), // o uuid.v4()
        dto.cuit, dto.name, dto.joinDate ?? new Date(), dto.type);
    }
    static fromPersistence(entity) {
        return new Company(entity.id, entity.cuit, entity.name, new Date(entity.joinDate), entity.type);
    }
}
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map