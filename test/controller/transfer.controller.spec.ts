import { Test, TestingModule } from "@nestjs/testing";
import { TransferController } from "../../src/context/transfer/infrastructure/http-api/controllers/transfer.controller";
import { TransferRepository } from "src/context/transfer/domain/repository/transfer.repository";
import { GetCompaniesWithTransfersLastMonthUseCase } from "../../src/context/transfer/application/use-cases/get-companies-with-transfers-last-month.use-case";
import { RegisterTransferUseCase } from "../../src/context/transfer/application/use-cases/register-transfer.use-case";
import { CreateTransferDto } from "../../src/context/transfer/application/dto/create-transfer.dto";
import { Transfer } from "../../src/context/transfer/domain/models/transfer.entity";
import { Company } from "../../src/context/company/domain/models/company.entity";

describe("TransferController", () => {
  let controller: TransferController;
  let mockTransferRepo: jest.Mocked<TransferRepository>;
  let mockGetCompaniesUseCase: jest.Mocked<GetCompaniesWithTransfersLastMonthUseCase>;
  let mockRegisterTransferUseCase: jest.Mocked<RegisterTransferUseCase>;

  beforeEach(async () => {
    mockTransferRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findAfter: jest.fn(),
      findBySourceId: jest.fn(),
    };

    mockGetCompaniesUseCase = {
      execute: jest.fn(),
    } as any;

    mockRegisterTransferUseCase = {
      execute: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [
        { provide: "TransferRepository", useValue: mockTransferRepo },
        {
          provide: GetCompaniesWithTransfersLastMonthUseCase,
          useValue: mockGetCompaniesUseCase,
        },
        {
          provide: RegisterTransferUseCase,
          useValue: mockRegisterTransferUseCase,
        },
      ],
    }).compile();

    controller = module.get<TransferController>(TransferController);
  });

  it("should register a transfer", async () => {
    const dto: CreateTransferDto = {
      sourceId: "abc123",
      sourceType: "Company",
      amount: 1500,
      debitAccount: "001",
      creditAccount: "002",
      date: new Date("2023-01-01"),
    };

    const response = await controller.register(dto);

    expect(mockRegisterTransferUseCase.execute).toHaveBeenCalledWith(dto);
    expect(response).toEqual({ message: "Transfer registered successfully" });
  });

  it("should return all transfers", async () => {
    const transfers: Transfer[] = [
      new Transfer("1", "s1", "Company", 1000, "d1", "c1", new Date()),
    ];
    mockTransferRepo.findAll.mockResolvedValue(transfers);

    const result = await controller.getAll();
    expect(result).toBe(transfers);
  });

  it("should return transfers from last month", async () => {
    const transfers: Transfer[] = [
      new Transfer("1", "s2", "Company", 500, "d2", "c2", new Date()),
    ];
    mockTransferRepo.findAfter.mockResolvedValue(transfers);

    const result = await controller.getTransfersInLastMonth();
    expect(result).toBe(transfers);
    expect(mockTransferRepo.findAfter).toHaveBeenCalled();
  });

  it("should return transfers by sourceId", async () => {
    const transfers: Transfer[] = [
      new Transfer("1", "s3", "Company", 800, "d3", "c3", new Date()),
    ];
    mockTransferRepo.findBySourceId.mockResolvedValue(transfers);

    const result = await controller.getBySource("s3");
    expect(result).toBe(transfers);
    expect(mockTransferRepo.findBySourceId).toHaveBeenCalledWith("s3");
  });

  it("should return companies with transfers in the last month", async () => {
    const companies: Company[] = [
      new Company(
        "c1",
        "20304050607",
        "Empresa X",
        new Date("2023-01-01"),
        "PYME"
      ),
    ];
    mockGetCompaniesUseCase.execute.mockResolvedValue(companies);

    const result = await controller.getCompaniesWithTransfers();
    expect(result).toBe(companies);
    expect(mockGetCompaniesUseCase.execute).toHaveBeenCalled();
  });
});
