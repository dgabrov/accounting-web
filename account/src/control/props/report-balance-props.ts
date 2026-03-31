import {CompanyData} from "../../data/company-data";
import {AccountTypeData} from "../../data/account-type-data";
import {ReportBalanceFormData} from "../../data/form-data";

export interface ReportBalancePropsData {
    company: CompanyData | null
    accountTypeMap: {[p: string] : AccountTypeData }
    form: ReportBalanceFormData
}

export interface ReportBalancePropsDispatch {
    dispatchError : (err : any) => void
    updateFormData: (start: string, end: string) => void;
}

export interface ReportBalanceProps extends ReportBalancePropsData, ReportBalancePropsDispatch {}