"use strict";
// import { CompanyRepository } from "../../domain/repository/company.repository";
// import { Company } from "../../domain/models/company.entity";
// export class CompanyMemoryRepository implements CompanyRepository {
//   private companies: Company[] = [];
//   async save(company: Company): Promise<void> {
//     this.companies.push(company);
//   }
//   async findAll(): Promise<Company[]> {
//     return [...this.companies];
//   }
//   async findById(id: string): Promise<Company | null> {
//     return this.companies.find((c) => c.id === id) || null;
//   }
//   async findByCuit(cuit: string): Promise<Company | null> {
//     return this.companies.find((c) => c.cuit === cuit) || null;
//   }
//   async findJoinedInLastMonth(): Promise<Company[]> {
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//     return this.companies.filter((c) => c.joinDate >= oneMonthAgo);
//   }
// }
//# sourceMappingURL=company.memory.repository.js.map