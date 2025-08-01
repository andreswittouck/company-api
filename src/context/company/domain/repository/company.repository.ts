import { Company } from "../models/company.entity";

export interface CompanyRepository {
  save(company: Company): Promise<void>;
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company | null>;
  findByCuit(cuit: string): Promise<Company | null>;
  findJoinedInLastMonth(): Promise<Company[]>;
}
