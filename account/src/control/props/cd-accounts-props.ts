import {AccountData} from "../../data/account-data";

export interface CdAccountsPropsData {
    accounts: AccountData[]
}

export interface CdAccountPropsDispatch {
    confirm: (ids: string[]) => void
    cancel: () => void
}

export interface CdAccountsProps extends CdAccountsPropsData, CdAccountPropsDispatch {}