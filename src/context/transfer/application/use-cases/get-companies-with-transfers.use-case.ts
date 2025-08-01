import { TransferRepository } from "../../domain/repository/transfer.repository";
import { CompanyRepository } from "../../../company/domain/repository/company.repository";
import { Company } from "../../../company/domain/models/company.entity";

export class GetCompaniesWithTransfersUseCase {
  constructor(
    private readonly transferRepo: TransferRepository,
    private readonly companyRepo: CompanyRepository
  ) {}

  async execute(): Promise<Company[]> {
    const transfers = await this.transferRepo.findTransfersInLastMonth();
    const companyIds = new Set(transfers.map((t) => t.sourceId));
    const allCompanies = await this.companyRepo.findAll();

    return allCompanies.filter((c) => companyIds.has(c.id));
  }
}
