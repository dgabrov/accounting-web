import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";
import {ReportAccountFormData} from "../../data/form-data";

export interface ReportAccountPropsData {
    companyName : string
    accounts: AccountData[]
    accountTypes: AccountTypeData[]
    form: ReportAccountFormData
}

export interface ReportAccountPropsDispatch {
    dispatchError : (err: any) => void
    updateFormData: (data: ReportAccountFormData) => void
}

export interface ReportAccountProps extends ReportAccountPropsData, ReportAccountPropsDispatch {}
