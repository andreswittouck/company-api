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
import { CreateCompanyDto } from "../../../../../../src/context/company/application/dto/create-company.dto";
import { Company } from "../../../../../../src/context/company/domain/models/company.entity";
import { CompanyRepository } from "../../../../../../src/context/company/domain/repository/company.repository";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RegisterCompanyUseCase } from "../../../../../../src/context/company/application/use-cases/register-company.use-case";

@Controller("companies")
export class CompanyController {
  constructor(
    @Inject("CompanyRepository")
    private readonly companyRepo: CompanyRepository,
    private readonly registerCompanyUseCase: RegisterCompanyUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear empresa" })
  @ApiResponse({ status: 201, description: "Empresa creada" })
  @ApiResponse({ status: 409, description: "Empresa ya existente" })
  @ApiBody({
    type: CreateCompanyDto,
    description: "Datos necesarios para crear una empresa",
    examples: {
      ejemplo: {
        summary: "Empresa PYME",
        value: {
          cuit: "20304567891",
          name: "Tech Corp",
          type: "PYME",
        },
      },
    },
  })
  async create(@Body() dto: CreateCompanyDto): Promise<{ message: string }> {
    await this.registerCompanyUseCase.execute(dto);
    return { message: "Company registered successfully" };
  }

  @Get()
  @ApiOperation({ summary: "Listar empresas" })
  async findAll(): Promise<Company[]> {
    return this.companyRepo.findAll();
  }

  @Get("recently-joined")
  @ApiOperation({ summary: "Empresas que se unieron en el último mes" })
  async findJoinedInLastMonth(): Promise<Company[]> {
    return this.companyRepo.findJoinedInLastMonth();
  }

  @Get(":cuit")
  @ApiOperation({ summary: "Buscar empresa por CUIT" })
  @ApiResponse({
    status: 200,
    description: "Empresa encontrada",
    type: Company,
  })
  @ApiResponse({ status: 404, description: "Empresa no encontrada" })
  async findByCuit(@Param("cuit") cuit: string): Promise<Company> {
    const company = await this.companyRepo.findByCuit(cuit);
    if (!company) {
      throw new HttpException("Company not found", HttpStatus.NOT_FOUND);
    }
    return company;
  }
}
