import {AccountValues} from "./common-data";

export interface TrialBalanceRequest {
    start: string
    end: string
    companyId : string
}

export interface TrialBalance {
    accountId: string
    code: string
    name: string
    accountTypeCd: string
    startBalance: AccountValues
    runs: AccountValues
    endBalance: AccountValues
}

export interface TrialBalanceResponse {
    start: string
    end: string
    companyId: string
    items: TrialBalance[]
    totals: TrialBalance
}
