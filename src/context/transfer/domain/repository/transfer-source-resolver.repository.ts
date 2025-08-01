import { TransferSource } from "../models/transfer-source.interface";

export interface TransferSourceResolver {
  resolve(type: string, id: string): Promise<TransferSource | null>;
}
