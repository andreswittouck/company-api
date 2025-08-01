"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTransfersUseCase = void 0;
class GetAllTransfersUseCase {
    constructor(transferRepo) {
        this.transferRepo = transferRepo;
    }
    async execute() {
        return this.transferRepo.findAll();
    }
}
exports.GetAllTransfersUseCase = GetAllTransfersUseCase;
//# sourceMappingURL=get-all-transfers.use-case.js.map