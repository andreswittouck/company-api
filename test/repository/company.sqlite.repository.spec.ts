import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanySqliteRepository } from "../../src/context/company/infrastructure/repository/company.sqlite.repository";
import { CompanyEntity } from "../../src/context/company/infrastructure/persistence/company.entity";
import { Company } from "../../src/context/company/domain/models/company.entity";
import { v4 as uuid } from "uuid";

describe("CompanySqliteRepository", () => {
  let repository: CompanySqliteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          dropSchema: true,
          entities: [CompanyEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([CompanyEntity]),
      ],
      providers: [CompanySqliteRepository],
    }).compile();

    repository = module.get(CompanySqliteRepository);
  });

  it("should save and retrieve a company by ID", async () => {
    const company = new Company(
      uuid(),
      "20304567891",
      "Test Co",
      new Date(),
      "PYME"
    );
    await repository.save(company);

    const found = await repository.findById(company.id);
    expect(found).toBeDefined();
    expect(found?.cuit).toBe(company.cuit);
    expect(found?.name).toBe(company.name);
  });

  // Agregá más tests: findByCuit, findAll, findJoinedInLastMonth...
});
