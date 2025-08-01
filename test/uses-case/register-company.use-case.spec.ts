import { RegisterCompanyUseCase } from "../../src/context/company/application/use-cases/register-company.use-case";
import { CompanyRepository } from "src/context/company/domain/repository/company.repository";
import { CreateCompanyDto } from "src/context/company/application/dto/create-company.dto";
import { Company } from "src/context/company/domain/models/company.entity";

describe("RegisterCompanyUseCase", () => {
  let useCase: RegisterCompanyUseCase;
  let mockCompanyRepo: jest.Mocked<CompanyRepository>;

  beforeEach(() => {
    mockCompanyRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByCuit: jest.fn(),
      findJoinedInLastMonth: jest.fn(),
    };

    useCase = new RegisterCompanyUseCase(mockCompanyRepo);
  });

  it("should create and save a company", async () => {
    const dto: CreateCompanyDto = {
      cuit: "20304567891",
      name: "Tech Corp",
      joinDate: new Date("2023-01-01"),
      type: "CORPORATE",
    };

    await useCase.execute(dto);

    expect(mockCompanyRepo.save).toHaveBeenCalledTimes(1);
    const savedCompany: Company = mockCompanyRepo.save.mock.calls[0][0];

    expect(savedCompany.cuit).toBe(dto.cuit);
    expect(savedCompany.name).toBe(dto.name);
    expect(savedCompany.joinDate.toISOString()).toBe(
      dto.joinDate!.toISOString()
    );
    expect(savedCompany.type).toBe(dto.type);
    expect(savedCompany.id).toBeDefined();
  });

  it("should assign current date if joinDate is not provided", async () => {
    const dto: CreateCompanyDto = {
      cuit: "20304567891",
      name: "No Date Corp",
      type: "PYME",
    };

    const before = new Date();
    await useCase.execute(dto);
    const after = new Date();

    const savedCompany: Company = mockCompanyRepo.save.mock.calls[0][0];
    expect(savedCompany.joinDate.getTime()).toBeGreaterThanOrEqual(
      before.getTime()
    );
    expect(savedCompany.joinDate.getTime()).toBeLessThanOrEqual(
      after.getTime()
    );
  });
});
