export class CompanyNotFoundError extends Error {
  constructor(companyId: string) {
    super(`Company with ID ${companyId} not found`);
    this.name = "CompanyNotFoundError";
  }
}
