import { TransferRepository } from "../../domain/repository/transfer.repository";
import { CreateTransferDto } from "../dto/create-transfer.dto";
import { Transfer } from "../../domain/models/transfer.entity";
import { v4 as uuid } from "uuid";
import { TransferSourceResolver } from "../../domain/repository/transfer-source-resolver.repository";

export class RegisterTransferUseCase {
  constructor(
    private readonly transferRepo: TransferRepository,
    private readonly sourceResolver: TransferSourceResolver
  ) {}

  async execute(input: CreateTransferDto): Promise<void> {
    const source = await this.sourceResolver.resolve(
      input.sourceType,
      input.sourceId
    );

    if (!source) {
      throw new Error(
        `Entity of type ${input.sourceType} with ID ${input.sourceId} not found`
      );
    }

    const transfer = new Transfer(
      uuid(),
      input.sourceId,
      input.sourceType,
      input.amount,
      input.debitAccount,
      input.creditAccount,
      input.date
    );

    await this.transferRepo.save(transfer);
  }
}
