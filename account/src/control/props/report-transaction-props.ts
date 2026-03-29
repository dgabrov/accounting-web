import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";
import {CompanyData} from "../../data/company-data";
import {ReportTransactionFormData, TransactionsFormData} from "../../data/form-data";

export interface ReportTransactionPropsData {
    allCompanyAcounts: AccountData[]
    accountTypes: AccountTypeData[]
    company: CompanyData
    form: ReportTransactionFormData
}

export interface ReportTransactionPropsDispatch {
    triggerError: (err: any) => void,
    updateForm: (data: ReportTransactionFormData) => void
}

export interface ReportTransactionProps extends ReportTransactionPropsData, ReportTransactionPropsDispatch{
}
