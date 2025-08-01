export class CreateCompanyDto {
  cuit!: string;
  name!: string;
  joinDate!: Date;
  type!: "CORPORATE" | "PYME";
}
