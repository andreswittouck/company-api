import { RegisterTransferUseCase } from "../../src/context/transfer/application/use-cases/register-transfer.use-case";
import { TransferRepository } from "src/context/transfer/domain/repository/transfer.repository";
import { CompanyRepository } from "src/context/company/domain/repository/company.repository";
import { CreateTransferDto } from "src/context/transfer/application/dto/create-transfer.dto";

describe("RegisterTransferUseCase", () => {
  let useCase: RegisterTransferUseCase;
  let mockTransferRepo: jest.Mocked<TransferRepository>;
  let mockCompanyRepo: jest.Mocked<CompanyRepository>;

  beforeEach(() => {
    mockTransferRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findAfter: jest.fn(),
      findBySourceId: jest.fn(),
    };

    mockCompanyRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCuit: jest.fn(),
      findJoinedInLastMonth: jest.fn(),
    };

    useCase = new RegisterTransferUseCase(mockTransferRepo, mockCompanyRepo);
  });

  it("should throw if company is not found", async () => {
    mockCompanyRepo.findById.mockResolvedValue(null);

    const dto: CreateTransferDto = {
      sourceId: "abc123",
      sourceType: "Company",
      amount: 1000,
      debitAccount: "123-456",
      creditAccount: "789-000",
      date: new Date(),
    };

    await expect(useCase.execute(dto)).rejects.toThrow(
      `Entity of type ${dto.sourceType} with ID ${dto.sourceId} not found`
    );
    expect(mockTransferRepo.save).not.toHaveBeenCalled();
  });

  it("should create and save transfer if company exists", async () => {
    mockCompanyRepo.findById.mockResolvedValue({
      id: "abc123",
      cuit: "20304567891",
      name: "Mock Company",
      type: "PYME",
      joinDate: new Date(),
    });

    const dto: CreateTransferDto = {
      sourceId: "abc123",
      sourceType: "Company",
      amount: 1000,
      debitAccount: "123-456",
      creditAccount: "789-000",
      date: new Date("2023-01-01"),
    };

    await useCase.execute(dto);

    expect(mockCompanyRepo.findById).toHaveBeenCalledWith(dto.sourceId);
    expect(mockTransferRepo.save).toHaveBeenCalledTimes(1);

    const savedTransfer = mockTransferRepo.save.mock.calls[0][0];
    expect(savedTransfer.amount).toBe(dto.amount);
    expect(savedTransfer.debitAccount).toBe(dto.debitAccount);
    expect(savedTransfer.creditAccount).toBe(dto.creditAccount);
    expect(savedTransfer.sourceId).toBe(dto.sourceId);
    expect(savedTransfer.sourceType).toBe(dto.sourceType);
    expect(savedTransfer.date.toISOString()).toBe(dto.date?.toISOString());
    expect(savedTransfer.id).toBeDefined();
  });
});
