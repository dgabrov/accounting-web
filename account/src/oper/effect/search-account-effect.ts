import {createActionMessage} from "../action/message-action";
import {doSearchAccounts} from "../../service/service";
import {AccountData} from "../../data/account-data";
import {createActionSearchAccounts} from "../action/search-acounts";

export const searchAccountsEffect = (companyId: string, search: string) => {
    return async (dispatch: any) => {
        try {
            // search stuff
            const accounts: AccountData[] = await doSearchAccounts(companyId, search);

            // new accounts there
            dispatch(createActionSearchAccounts(accounts));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
