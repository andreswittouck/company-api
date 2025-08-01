"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
class Transfer {
    constructor(id, sourceId, sourceType, amount, debitAccount, creditAccount, date) {
        this.id = id;
        this.sourceId = sourceId;
        this.sourceType = sourceType;
        this.amount = amount;
        this.debitAccount = debitAccount;
        this.creditAccount = creditAccount;
        this.date = date;
    }
    static create(props) {
        return new Transfer(props.id ?? crypto.randomUUID(), props.sourceId, props.sourceType, props.amount, props.debitAccount, props.creditAccount, props.date);
    }
}
exports.Transfer = Transfer;
//# sourceMappingURL=transfer.entity.js.map