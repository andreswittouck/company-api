import { RegisterTransferUseCase } from "../../src/context/transfer/application/use-cases/register-transfer.use-case";
import { TransferRepository } from "src/context/transfer/domain/repository/transfer.repository";
import { TransferSourceResolver } from "src/context/transfer/domain/repository/transfer-source-resolver.repository";
import { CreateTransferDto } from "src/context/transfer/application/dto/create-transfer.dto";

describe("RegisterTransferUseCase", () => {
  let useCase: RegisterTransferUseCase;
  let mockTransferRepo: jest.Mocked<TransferRepository>;
  let mockSourceResolver: jest.Mocked<TransferSourceResolver>;

  beforeEach(() => {
    mockTransferRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findAfter: jest.fn(),
      findBySourceId: jest.fn(),
    };

    mockSourceResolver = {
      resolve: jest.fn(),
    };

    useCase = new RegisterTransferUseCase(mockTransferRepo, mockSourceResolver);
  });

  it("should throw if source is not found", async () => {
    mockSourceResolver.resolve.mockResolvedValue(null);

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

  it("should create and save transfer if source exists", async () => {
    mockSourceResolver.resolve.mockResolvedValue({
      id: "abc123",
      name: "Mock Source",
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

    expect(mockSourceResolver.resolve).toHaveBeenCalledWith(
      dto.sourceType,
      dto.sourceId
    );

    expect(mockTransferRepo.save).toHaveBeenCalledTimes(1);
    const savedTransfer = mockTransferRepo.save.mock.calls[0][0];

    expect(savedTransfer.amount).toBe(dto.amount);
    expect(savedTransfer.debitAccount).toBe(dto.debitAccount);
    expect(savedTransfer.creditAccount).toBe(dto.creditAccount);
    expect(savedTransfer.sourceId).toBe(dto.sourceId);
    expect(savedTransfer.sourceType).toBe(dto.sourceType);
    expect(savedTransfer.date.toISOString()).toBe(dto.date.toISOString());
    expect(savedTransfer.id).toBeDefined();
  });
});
