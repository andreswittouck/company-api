import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransferSqliteRepository } from "../../src/context/transfer/infrastructure/repository/transfer.sqlite.repository";
import { TransferEntity } from "../../src/context/transfer/infrastructure/persistence/transfer.entity";
import { Transfer } from "../../src/context/transfer/domain/models/transfer.entity";
import { v4 as uuid } from "uuid";

describe("TransferSqliteRepository", () => {
  let repository: TransferSqliteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          dropSchema: true,
          entities: [TransferEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([TransferEntity]),
      ],
      providers: [TransferSqliteRepository],
    }).compile();

    repository = module.get(TransferSqliteRepository);
  });

  const buildTransfer = (override?: Partial<Transfer>) =>
    new Transfer(
      override?.id ?? uuid(),
      override?.sourceId ?? "src1",
      override?.sourceType ?? "Company",
      override?.amount ?? 100,
      override?.debitAccount ?? "111-111",
      override?.creditAccount ?? "222-222",
      override?.date ?? new Date()
    );

  it("should save and retrieve all transfers", async () => {
    const transfer = buildTransfer();
    await repository.save(transfer);

    const result = await repository.findAll();
    expect(result.length).toBe(1);
    expect(result[0].amount).toBe(transfer.amount);
  });

  it("should find transfers by sourceId", async () => {
    const transfer = buildTransfer({ sourceId: "abc123" });
    await repository.save(transfer);

    const result = await repository.findBySourceId("abc123");
    expect(result.length).toBe(1);
    expect(result[0].sourceId).toBe("abc123");
  });

  it("should find transfers after a given date", async () => {
    const oldTransfer = buildTransfer({ date: new Date("2022-01-01") });
    const recentTransfer = buildTransfer({ date: new Date() });

    await repository.save(oldTransfer);
    await repository.save(recentTransfer);

    const result = await repository.findAfter(new Date("2023-01-01"));
    expect(result.length).toBe(1);
    expect(result[0].date.getTime()).toBeGreaterThan(
      new Date("2023-01-01").getTime()
    );
  });
});
