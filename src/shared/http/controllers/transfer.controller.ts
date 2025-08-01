import { Controller, Get, Post, Body, Inject } from "@nestjs/common";
import { TransferRepository } from "../../../context/transfer/domain/repository/transfer.repository";
import { CreateTransferDto } from "../../../context/transfer/application/dto/create-transfer.dto";
import { Transfer } from "../../../context/transfer/domain/models/transfer.entity";
import { GetCompaniesWithTransfersLastMonthUseCase } from "../../../context/transfer/application/use-cases/get-companies-with-transfers-last-month.use-case";

@Controller("transfers")
export class TransferController {
  constructor(
    @Inject("TransferRepository")
    private readonly transferRepo: TransferRepository,
    private readonly getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase
  ) {}

  @Post()
  async register(@Body() dto: CreateTransferDto): Promise<void> {
    const transfer = Transfer.create(dto);
    await this.transferRepo.save(transfer);
  }

  @Get()
  async getAll(): Promise<Transfer[]> {
    return this.transferRepo.findAll();
  }

  @Get("recent")
  async getTransfersInLastMonth(): Promise<Transfer[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.transferRepo.findAfter(oneMonthAgo);
  }

  @Get("by-source/:sourceId")
  async getBySource(@Body("sourceId") sourceId: string): Promise<Transfer[]> {
    return this.transferRepo.findBySourceId(sourceId);
  }

  @Get("companies-in-last-month")
  getCompaniesWithTransfers() {
    return this.getCompaniesWithTransfersLastMonthUseCase.execute();
  }
}
