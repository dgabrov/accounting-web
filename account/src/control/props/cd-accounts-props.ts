import {AccountData} from "../../data/account-data";

export interface CdAccountsPropsData {
    accounts: AccountData[]
    companyId: string
}

export interface CdAccountPropsDispatch {
    confirm: (ids: string[], companyId: string) => void
    cancel: () => void
}

export interface CdAccountsProps extends CdAccountsPropsData, CdAccountPropsDispatch {}