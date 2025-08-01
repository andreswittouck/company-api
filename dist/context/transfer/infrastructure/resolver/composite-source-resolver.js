"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeTransferSourceResolver = void 0;
class CompositeTransferSourceResolver {
    constructor(resolvers) {
        this.resolvers = resolvers;
    }
    async resolve(type, id) {
        for (const resolver of this.resolvers) {
            const source = await resolver.resolve(type, id);
            if (source)
                return source;
        }
        return null;
    }
}
exports.CompositeTransferSourceResolver = CompositeTransferSourceResolver;
//# sourceMappingURL=composite-source-resolver.js.map