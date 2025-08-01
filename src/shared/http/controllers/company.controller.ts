import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Inject,
} from "@nestjs/common";
import { CreateCompanyDto } from "../../../context/company/application/dto/create-company.dto";
import { Company } from "../../../context/company/domain/models/company.entity";
import { CompanyRepository } from "../../../context/company/domain/repository/company.repository";
import { GetCompaniesJoinedLastMonthUseCase } from "src/context/company/application/use-cases/get-companies-joined-last-month.use-case";

@Controller("companies")
export class CompanyController {
  constructor(
    @Inject("CompanyRepository")
    private readonly companyRepo: CompanyRepository
  ) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto): Promise<void> {
    const exists = await this.companyRepo.findByCuit(dto.cuit);
    if (exists) {
      throw new HttpException("Company already exists", HttpStatus.CONFLICT);
    }

    const company = Company.create(dto);
    await this.companyRepo.save(company);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyRepo.findAll();
  }
  @Get("recently-joined")
  async findJoinedInLastMonth(): Promise<Company[]> {
    console.log("entroo por el controller");
    return this.companyRepo.findJoinedInLastMonth();
  }
  @Get(":cuit")
  async findByCuit(@Param("cuit") cuit: string): Promise<Company> {
    const company = await this.companyRepo.findByCuit(cuit);
    if (!company) {
      throw new HttpException("Company not found", HttpStatus.NOT_FOUND);
    }
    return company;
  }
}
