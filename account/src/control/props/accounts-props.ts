import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";
import {AccountsFormData} from "../../data/form-data";

export interface AccountsPropsDispatch {
    edit: (account: AccountData) => void;
    delete: (ids: string[]) => void;
    add: () => void;
    doSearch: (companyId: string, search: string) => void;
    updateForm: (search: string) => void;
}

export interface AccountsPropsData {
    accounts: AccountData[];
    companyId : string;
    accountTypes: AccountTypeData[];
    form: AccountsFormData;
}

export interface AccountsProps extends AccountsPropsData, AccountsPropsDispatch {}
