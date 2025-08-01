import { TransferRepository } from "../../domain/repository/transfer.repository";
import { CreateTransferDto } from "../dto/create-transfer.dto";
import { Transfer } from "../../domain/models/transfer.entity";
import { v4 as uuid } from "uuid";
import { Inject, NotFoundException } from "@nestjs/common";
import { CompanyRepository } from "src/context/company/domain/repository/company.repository";

export class RegisterTransferUseCase {
  constructor(
    @Inject("TransferRepository")
    private readonly transferRepo: TransferRepository,

    @Inject("CompanyRepository")
    private readonly companyRepo: CompanyRepository
  ) {}

  async execute(input: CreateTransferDto): Promise<void> {
    const source = await this.companyRepo.findById(input.sourceId);

    if (!source) {
      throw new NotFoundException(
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
      input.date ?? new Date()
    );

    await this.transferRepo.save(transfer);
  }
}
