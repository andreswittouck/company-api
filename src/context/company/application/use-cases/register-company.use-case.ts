import { CompanyRepository } from "../../domain/repository/company.repository";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { Company } from "../../domain/models/company.entity";
import { v4 as uuid } from "uuid";

export class RegisterCompanyUseCase {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async execute(input: CreateCompanyDto): Promise<void> {
    const company = new Company(
      uuid(),
      input.cuit,
      input.name,
      new Date(),
      input.type
    );

    await this.companyRepo.save(company);
  }
}
