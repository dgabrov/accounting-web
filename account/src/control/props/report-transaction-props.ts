import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";
import {CompanyData} from "../../data/company-data";

export interface ReportTransactionPropsData {
    allCompanyAcounts: AccountData[]
    accountTypes: AccountTypeData[]
    company: CompanyData
}

export interface ReportTransactionPropsDispatch {
    triggerError: (err: any) => void
}

export interface ReportTransactionProps extends ReportTransactionPropsData, ReportTransactionPropsDispatch{
}
