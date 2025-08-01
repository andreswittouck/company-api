"use strict";
// import { TransferRepository } from "../../domain/repository/transfer.repository";
// import { Transfer } from "../../domain/models/transfer.entity";
// export class TransferMemoryRepository implements TransferRepository {
//   private transfers: Transfer[] = [];
//   async save(transfer: Transfer): Promise<void> {
//     this.transfers.push(transfer);
//   }
//   async findAll(): Promise<Transfer[]> {
//     return [...this.transfers];
//   }
//   async findBySourceId(sourceId: string): Promise<Transfer[]> {
//     return this.transfers.filter((t) => t.sourceId === sourceId);
//   }
//   async findTransfersInLastMonth(): Promise<Transfer[]> {
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//     return this.transfers.filter((t) => t.date >= oneMonthAgo);
//   }
// }
//# sourceMappingURL=transfer.memory.repository.js.map