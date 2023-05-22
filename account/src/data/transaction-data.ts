import {AccountData} from "./account-data";
import {AllMap} from "../util/tp";

export interface TransactionPosition {
    transactionPositionId: string;
    transactionId: string;
    accountId: string;
    sequence: number;
    debit: number;
    credit: number;
    comments: string;
}

export interface TransactionData {
    transactionId: string;
    companyId: string
    transactionDate: string
    sequence: number
    comments: string
    positions: TransactionPosition[];
}

const codeReducer = (accountMap : AllMap<AccountData>): (acc: string, pos: TransactionPosition) => string => {
    return (acc, pos) : string => {
        let code = '';
        const accountId = pos.accountId;
        if (accountMap.hasOwnProperty(accountId)) {
            code = accountMap[accountId].code;
        } else {
            code = `not found: ${accountId}`;
        }

        if (acc.trim().length === 0) {
            acc = acc + code;
        } else {
            acc = acc + ", " + code;
        }

        return acc;
    }
}

export const getTransactionString = (txn: TransactionData, accountMap : AllMap<AccountData>) : string => {
    const debit = txn.positions
        .filter((pos) => (pos.debit !== 0))
        .reduce(codeReducer(accountMap), '')

    const credit = txn.positions
        .filter((pos) => (pos.debit === 0))
        .reduce(codeReducer(accountMap), '');

    // the total for debit and credit must coincide therefore we only calculate one
    const total = txn.positions.reduce((val, position) => {
        val = val + position.debit
        return val;
    }, 0)

    return `${txn.transactionDate}, ${txn.comments}, ${debit}|${credit} total: ${total}`;
}

