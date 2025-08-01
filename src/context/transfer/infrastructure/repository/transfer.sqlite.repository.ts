import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TransferEntity } from "../persistence/transfer.entity";
import { TransferRepository } from "../../domain/repository/transfer.repository";
import { Transfer } from "../../domain/models/transfer.entity";

export class TransferSqliteRepository implements TransferRepository {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly ormRepo: Repository<TransferEntity>
  ) {}

  async save(transfer: Transfer): Promise<void> {
    const entity = this.ormRepo.create({ ...transfer });
    await this.ormRepo.save(entity);
  }

  async findAll(): Promise<Transfer[]> {
    return this.ormRepo.find();
  }

  async findBySourceId(sourceId: string): Promise<Transfer[]> {
    return this.ormRepo.find({ where: { sourceId } });
  }

  async findAfter(date: Date): Promise<Transfer[]> {
    return this.ormRepo.find({
      where: { date: MoreThan(date) },
    });
  }
}
