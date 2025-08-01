import { Inject } from "@nestjs/common";
import { CompanyRepository } from "../../../company/domain/repository/company.repository";
import { TransferRepository } from "../../domain/repository/transfer.repository";

export class GetCompaniesWithTransfersLastMonthUseCase {
  constructor(
    @Inject("CompanyRepository")
    private readonly companyRepo: CompanyRepository,
    @Inject("TransferRepository")
    private readonly transferRepo: TransferRepository
  ) {}

  async execute() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const transfers = await this.transferRepo.findAfter(oneMonthAgo);
    const companyIds = [...new Set(transfers.map((t) => t.sourceId))];
    return Promise.all(companyIds.map((id) => this.companyRepo.findById(id)));
  }
}
