import {AccountValues} from "./common-data";

export interface AccountReportRequest {
    start: string
    end: string
    accountId: string
}

export interface AccountReportDetail {
    transactionPositionId: string
    date: string
    amount: AccountValues
    transactionAmount: number
    comments: string
    debitCodes: string
    creditCodes: string
    currentBalance: number
}

export interface AccountReportResult {
    accountId: string
    code: string
    name: string
    accountTypeCd: string
    start: string
    end: string
    startBalance: AccountValues
    details: AccountReportDetail[]
    total: AccountValues
}

