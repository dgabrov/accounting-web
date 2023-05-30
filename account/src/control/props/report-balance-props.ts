import {CompanyData} from "../../data/company-data";
import {AccountTypeData} from "../../data/account-type-data";

export interface ReportBalancePropsData {
    company: CompanyData | null
    accountTypeMap: {[p: string] : AccountTypeData }
}

export interface ReportBalancePropsDispatch {
    dispatchError : (err : any) => void
}

export interface ReportBalanceProps extends ReportBalancePropsData, ReportBalancePropsDispatch {}