import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";

export interface ReportAccountPropsData {
    companyName : string
    accounts: AccountData[]
    accountTypes: AccountTypeData[]
}

export interface ReportAccountPropsDispatch {
    dispatchError : (err: any) => void
}

export interface ReportAccountProps extends ReportAccountPropsData, ReportAccountPropsDispatch {}
