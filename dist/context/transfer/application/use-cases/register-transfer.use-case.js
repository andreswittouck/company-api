"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterTransferUseCase = void 0;
const transfer_entity_1 = require("../../domain/models/transfer.entity");
const uuid_1 = require("uuid");
class RegisterTransferUseCase {
    constructor(transferRepo, sourceResolver) {
        this.transferRepo = transferRepo;
        this.sourceResolver = sourceResolver;
    }
    async execute(input) {
        const source = await this.sourceResolver.resolve(input.sourceType, input.sourceId);
        if (!source) {
            throw new Error(`Entity of type ${input.sourceType} with ID ${input.sourceId} not found`);
        }
        const transfer = new transfer_entity_1.Transfer((0, uuid_1.v4)(), input.sourceId, input.sourceType, input.amount, input.debitAccount, input.creditAccount, input.date);
        await this.transferRepo.save(transfer);
    }
}
exports.RegisterTransferUseCase = RegisterTransferUseCase;
//# sourceMappingURL=register-transfer.use-case.js.map