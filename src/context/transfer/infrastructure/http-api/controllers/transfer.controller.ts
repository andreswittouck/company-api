import { Controller, Get, Post, Body, Inject, Param } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

import { TransferRepository } from "../../../domain/repository/transfer.repository";
import { CreateTransferDto } from "../../../application/dto/create-transfer.dto";
import { Transfer } from "../../../domain/models/transfer.entity";
import { GetCompaniesWithTransfersLastMonthUseCase } from "../../../application/use-cases/get-companies-with-transfers-last-month.use-case";
import { RegisterTransferUseCase } from "../../../application/use-cases/register-transfer.use-case";

@ApiTags("Transfers")
@Controller("transfers")
export class TransferController {
  constructor(
    @Inject("TransferRepository")
    private readonly transferRepo: TransferRepository,
    private readonly getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase,
    private readonly registerTransferUseCase: RegisterTransferUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: "Registrar una transferencia" })
  @ApiResponse({ status: 201, description: "Transferencia registrada" })
  @ApiBody({
    type: CreateTransferDto,
    description: "Datos para registrar una transferencia",
    examples: {
      ejemplo: {
        summary: "Transferencia de ejemplo",
        value: {
          sourceId: "abc123",
          sourceType: "Company",
          amount: 1000,
          debitAccount: "123-456",
          creditAccount: "789-000",
        },
      },
    },
  })
  async register(@Body() dto: CreateTransferDto): Promise<{ message: string }> {
    await this.registerTransferUseCase.execute(dto);
    return { message: "Transfer registered successfully" };
  }

  @Get()
  @ApiOperation({ summary: "Obtener todas las transferencias" })
  @ApiResponse({ status: 200, description: "Lista de transferencias" })
  async getAll(): Promise<Transfer[]> {
    return this.transferRepo.findAll();
  }

  @Get("recent")
  @ApiOperation({
    summary: "Obtener transferencias del último mes",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de transferencias recientes",
  })
  async getTransfersInLastMonth(): Promise<Transfer[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return this.transferRepo.findAfter(oneMonthAgo);
  }

  @Get("by-source/:sourceId")
  @ApiOperation({ summary: "Obtener transferencias por sourceId" })
  @ApiParam({ name: "sourceId", description: "ID de la entidad fuente" })
  @ApiResponse({
    status: 200,
    description: "Transferencias encontradas por entidad",
  })
  async getBySource(@Param("sourceId") sourceId: string): Promise<Transfer[]> {
    return this.transferRepo.findBySourceId(sourceId);
  }

  @Get("companies-in-last-month")
  @ApiOperation({
    summary: "Obtener empresas con transferencias en el último mes",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de empresas con transferencias recientes",
  })
  getCompaniesWithTransfers() {
    return this.getCompaniesWithTransfersLastMonthUseCase.execute();
  }
}
