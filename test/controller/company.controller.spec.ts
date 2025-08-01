import { Test, TestingModule } from "@nestjs/testing";
import { CompanyController } from "../../src/context/company/infrastructure/http-api/controllers/company.controller";
import { CompanyRepository } from "src/context/company/domain/repository/company.repository";
import { CreateCompanyDto } from "src/context/company/application/dto/create-company.dto";
import { Company } from "../../src/context/company/domain/models/company.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { RegisterCompanyUseCase } from "../../src/context/company/application/use-cases/register-company.use-case";

describe("CompanyController", () => {
  let controller: CompanyController;
  let mockRepo: jest.Mocked<CompanyRepository>;
  let mockRegisterCompanyUseCase: jest.Mocked<RegisterCompanyUseCase>;

  beforeEach(async () => {
    mockRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCuit: jest.fn(),
      findJoinedInLastMonth: jest.fn(),
    };

    mockRegisterCompanyUseCase = {
      execute: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        { provide: "CompanyRepository", useValue: mockRepo },
        {
          provide: RegisterCompanyUseCase,
          useValue: mockRegisterCompanyUseCase,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it("should create a new company", async () => {
    const dto: CreateCompanyDto = {
      cuit: "20304567891",
      name: "Test Company",
      joinDate: new Date(),
      type: "PYME",
    };

    await controller.create(dto);

    expect(mockRegisterCompanyUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it("should return all companies", async () => {
    const companies: Company[] = [
      new Company("id1", "20...", "A", new Date(), "PYME"),
    ];
    mockRepo.findAll.mockResolvedValue(companies);

    const result = await controller.findAll();

    expect(result).toBe(companies);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });

  it("should return recently joined companies", async () => {
    const recent: Company[] = [
      new Company("id2", "20...", "B", new Date(), "CORPORATE"),
    ];
    mockRepo.findJoinedInLastMonth.mockResolvedValue(recent);

    const result = await controller.findJoinedInLastMonth();

    expect(result).toBe(recent);
    expect(mockRepo.findJoinedInLastMonth).toHaveBeenCalled();
  });

  it("should return company by cuit", async () => {
    const company = new Company("id3", "20...", "C", new Date(), "PYME");
    mockRepo.findByCuit.mockResolvedValue(company);

    const result = await controller.findByCuit("20...");

    expect(result).toBe(company);
    expect(mockRepo.findByCuit).toHaveBeenCalledWith("20...");
  });

  it("should throw not found if company not found by cuit", async () => {
    mockRepo.findByCuit.mockResolvedValue(null);

    await expect(controller.findByCuit("20...")).rejects.toThrow(
      new HttpException("Company not found", HttpStatus.NOT_FOUND)
    );
  });
});
