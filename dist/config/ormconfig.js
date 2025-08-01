"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../context/company/infrastructure/persistence/company.entity");
const transfer_entity_1 = require("../context/transfer/infrastructure/persistence/transfer.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true, // solo en dev
    entities: [company_entity_1.CompanyEntity, transfer_entity_1.TransferEntity],
});
//# sourceMappingURL=ormconfig.js.map