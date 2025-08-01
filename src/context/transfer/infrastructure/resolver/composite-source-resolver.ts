import { TransferSourceResolver } from "../../../transfer/domain/repository/transfer-source-resolver.repository";
import { TransferSource } from "../../../transfer/domain/models/transfer-source.interface";

export class CompositeTransferSourceResolver implements TransferSourceResolver {
  constructor(private readonly resolvers: TransferSourceResolver[]) {}

  async resolve(type: string, id: string): Promise<TransferSource | null> {
    for (const resolver of this.resolvers) {
      const source = await resolver.resolve(type, id);
      if (source) return source;
    }
    return null;
  }
}
