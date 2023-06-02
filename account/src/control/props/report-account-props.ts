import {AccountData} from "../../data/account-data";

export interface ReportAccountPropsData {
    companyName : string
    accounts: AccountData[]
}

export interface ReportAccountPropsDispatch {
    dispatchError : (err: any) => void
}

export interface ReportAccountProps extends ReportAccountPropsData, ReportAccountPropsDispatch {}
