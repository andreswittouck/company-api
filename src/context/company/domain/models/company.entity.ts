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
      dto.id ?? crypto.randomUUID(), // o uuid.v4()
      dto.cuit,
      dto.name,
      dto.joinDate ?? new Date(),
      dto.type
    );
  }

  static fromPersistence(entity: any): Company {
    return new Company(
      entity.id,
      entity.cuit,
      entity.name,
      new Date(entity.joinDate),
      entity.type
    );
  }
}
