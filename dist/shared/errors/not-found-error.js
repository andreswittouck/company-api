"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyNotFoundError = void 0;
class CompanyNotFoundError extends Error {
    constructor(companyId) {
        super(`Company with ID ${companyId} not found`);
        this.name = "CompanyNotFoundError";
    }
}
exports.CompanyNotFoundError = CompanyNotFoundError;
//# sourceMappingURL=not-found-error.js.map