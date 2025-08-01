import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThan } from "typeorm";
import { Injectable } from "@nestjs/common";

import { CompanyRepository } from "../../domain/repository/company.repository";
import { Company } from "../../domain/models/company.entity";
import { CompanyEntity } from "../persistence/company.entity";

@Injectable()
export class CompanySqliteRepository implements CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly ormRepo: Repository<CompanyEntity>
  ) {}

  async save(company: Company): Promise<void> {
    const entity = this.ormRepo.create({
      id: company.id,
      name: company.name,
      cuit: company.cuit,
      joinDate: company.joinDate,
      type: company.type,
    });
    await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<Company | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    return entity
      ? new Company(
          entity.id,
          entity.cuit,
          entity.name,
          entity.joinDate,
          entity.type
        )
      : null;
  }

  async findByCuit(cuit: string): Promise<Company | null> {
    const entity = await this.ormRepo.findOneBy({ cuit });
    return entity
      ? new Company(
          entity.id,
          entity.cuit,
          entity.name,
          entity.joinDate,
          entity.type
        )
      : null;
  }

  async findJoinedInLastMonth(): Promise<Company[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const entities = await this.ormRepo.find({
      where: {
        joinDate: MoreThan(oneMonthAgo),
      },
    });

    return entities.map(
      (e) => new Company(e.id, e.cuit, e.name, e.joinDate, e.type)
    );
  }

  async findAll(): Promise<Company[]> {
    const entities = await this.ormRepo.find();
    return entities.map(
      (e) => new Company(e.id, e.cuit, e.name, e.joinDate, e.type)
    );
  }
}
