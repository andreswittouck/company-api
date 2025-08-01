import { TransferSourceResolver } from "../../../transfer/domain/repository/transfer-source-resolver.repository";
import { CompanyRepository } from "../../domain/repository/company.repository";

export class CompanyTransferSourceResolver implements TransferSourceResolver {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async resolve(type: string, id: string) {
    if (type !== "company") return null;
    const company = await this.companyRepo.findById(id);
    return company ? { id: company.id, name: company.name } : null;
  }
}
