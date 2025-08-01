import { TransferRepository } from "../../domain/repository/transfer.repository";
import { Transfer } from "../../domain/models/transfer.entity";

export class GetAllTransfersUseCase {
  constructor(private readonly transferRepo: TransferRepository) {}

  async execute(): Promise<Transfer[]> {
    return this.transferRepo.findAll();
  }
}
