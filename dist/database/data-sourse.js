"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../context/company/infrastructure/persistence/company.entity");
const transfer_entity_1 = require("../context/transfer/infrastructure/persistence/transfer.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./db.sqlite",
    synchronize: true, // solo para dev
    entities: [company_entity_1.CompanyEntity, transfer_entity_1.TransferEntity],
});
//# sourceMappingURL=data-sourse.js.map