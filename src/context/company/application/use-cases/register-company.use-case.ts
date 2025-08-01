import { CompanyRepository } from "../../domain/repository/company.repository";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { Company } from "../../domain/models/company.entity";
import { v4 as uuid } from "uuid";
import { Inject, NotFoundException } from "@nestjs/common";

export class RegisterCompanyUseCase {
  constructor(
    @Inject("CompanyRepository")
    private readonly companyRepo: CompanyRepository
  ) {}

  async execute(input: CreateCompanyDto): Promise<void> {
    const existingCompany = await this.companyRepo.findByCuit(input.cuit);
    if (existingCompany) {
      throw new NotFoundException(
        `Company with CUIT ${input.cuit} already exists`
      );
    }

    const company = new Company(
      uuid(),
      input.cuit,
      input.name,
      input.joinDate ?? new Date(),
      input.type
    );

    await this.companyRepo.save(company);
  }
}
