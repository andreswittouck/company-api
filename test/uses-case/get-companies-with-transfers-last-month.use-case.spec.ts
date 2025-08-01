import { GetCompaniesWithTransfersLastMonthUseCase } from "../../src/context/transfer/application/use-cases/get-companies-with-transfers-last-month.use-case";
import { CompanyRepository } from "src/context/company/domain/repository/company.repository";
import { TransferRepository } from "src/context/transfer/domain/repository/transfer.repository";
import { Company } from "../../src/context/company/domain/models/company.entity";
import { Transfer } from "../../src/context/transfer/domain/models/transfer.entity";

describe("GetCompaniesWithTransfersLastMonthUseCase", () => {
  let useCase: GetCompaniesWithTransfersLastMonthUseCase;
  let mockCompanyRepo: jest.Mocked<CompanyRepository>;
  let mockTransferRepo: jest.Mocked<TransferRepository>;

  beforeEach(() => {
    mockCompanyRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCuit: jest.fn(),
      findJoinedInLastMonth: jest.fn(),
    };

    mockTransferRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      findBySourceId: jest.fn(),
      findAfter: jest.fn(),
    };

    useCase = new GetCompaniesWithTransfersLastMonthUseCase(
      mockCompanyRepo,
      mockTransferRepo
    );
  });

  it("should fetch transfers from last month and return associated companies", async () => {
    const mockTransfers: Transfer[] = [
      {
        id: "1",
        sourceId: "c1",
        sourceType: "Company",
        amount: 100,
        debitAccount: "d1",
        creditAccount: "c1",
        date: new Date(),
      },
      {
        id: "2",
        sourceId: "c2",
        sourceType: "Company",
        amount: 200,
        debitAccount: "d2",
        creditAccount: "c2",
        date: new Date(),
      },
      {
        id: "3",
        sourceId: "c1",
        sourceType: "Company",
        amount: 300,
        debitAccount: "d3",
        creditAccount: "c3",
        date: new Date(),
      },
    ];

    const company1 = new Company(
      "c1",
      "20304567891",
      "Empresa Uno",
      new Date(),
      "PYME"
    );
    const company2 = new Company(
      "c2",
      "20304567892",
      "Empresa Dos",
      new Date(),
      "CORPORATE"
    );

    mockTransferRepo.findAfter.mockResolvedValue(mockTransfers);
    mockCompanyRepo.findById.mockImplementation((id: string) => {
      if (id === "c1") return Promise.resolve(company1);
      if (id === "c2") return Promise.resolve(company2);
      return Promise.resolve(null);
    });

    const result = await useCase.execute();

    expect(mockTransferRepo.findAfter).toHaveBeenCalled();
    expect(mockCompanyRepo.findById).toHaveBeenCalledTimes(2);
    expect(result).toContain(company1);
    expect(result).toContain(company2);
  });
});
