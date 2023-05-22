import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";

export interface AccountsPropsDispatch {
    edit: (account: AccountData) => void;
    delete: (ids: string[]) => void;
    add: () => void;
    doSearch: (companyId: string, search: string) => void;
}

export interface AccountsPropsData {
    accounts: AccountData[];
    companyId : string;
    accountTypes: AccountTypeData[];
}

export interface AccountsProps extends AccountsPropsData, AccountsPropsDispatch {}
