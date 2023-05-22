import {AccountData} from "../../data/account-data";
import {AccountTypeData} from "../../data/account-type-data";

export interface EditAccountPropsData {
    data: AccountData;
    adding: boolean;
    accountTypes: AccountTypeData[];
}

export interface EditAccountPropsDispatch {
    save: (data: AccountData, adding: boolean) => void
    cancel: () => void
}

export interface EditAccountProps extends EditAccountPropsData, EditAccountPropsDispatch {}
