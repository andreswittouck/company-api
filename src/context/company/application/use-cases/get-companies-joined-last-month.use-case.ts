import { Inject } from "@nestjs/common";
import { CompanyRepository } from "../../domain/repository/company.repository";

export class GetCompaniesJoinedLastMonthUseCase {
  constructor(
    @Inject("CompanyRepository")
    private readonly repo: CompanyRepository
  ) {}

  async execute() {
    return this.repo.findJoinedInLastMonth();
  }
}
