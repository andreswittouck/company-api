import { Company } from "src/context/company/domain/models/company.entity";
import { Transfer } from "../models/transfer.entity";

export interface TransferRepository {
  save(transfer: Transfer): Promise<void>;
  findAll(): Promise<Transfer[]>;
  findBySourceId(sourceId: string): Promise<Transfer[]>;
  findTransfersInLastMonth(): Promise<Transfer[]>;
}
