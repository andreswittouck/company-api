"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferMemoryRepository = void 0;
class TransferMemoryRepository {
    constructor() {
        this.transfers = [];
    }
    async save(transfer) {
        this.transfers.push(transfer);
    }
    async findAll() {
        return [...this.transfers];
    }
    async findByCompanyId(sourceId) {
        return this.transfers.filter((t) => t.sourceId === sourceId);
    }
    async findTransfersInLastMonth() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return this.transfers.filter((t) => t.date >= oneMonthAgo);
    }
}
exports.TransferMemoryRepository = TransferMemoryRepository;
//# sourceMappingURL=transfer.memory.repository%20copy.js.map