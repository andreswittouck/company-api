import { CompanyRepository } from "../../domain/repository/company.repository";
import { Company } from "../../domain/models/company.entity";

export class GetRecentlyJoinedCompaniesUseCase {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async execute(): Promise<Company[]> {
    return this.companyRepo.findJoinedInLastMonth();
  }
}
