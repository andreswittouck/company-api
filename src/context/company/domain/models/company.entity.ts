import { v4 as uuidv4 } from "uuid";

export class Company {
  constructor(
    public readonly id: string,
    public readonly cuit: string,
    public readonly name: string,
    public readonly joinDate: Date,
    public readonly type: "PYME" | "CORPORATE"
  ) {}

  static create(dto: {
    id?: string;
    cuit: string;
    name: string;
    joinDate: Date;
    type: "CORPORATE" | "PYME";
  }): Company {
    return new Company(
      dto.id ?? uuidv4(),
      dto.cuit,
      dto.name,
      dto.joinDate ?? new Date(),
      dto.type
    );
  }
}
