import {createActionMessage} from "../action/message-action";
import {deleteAccounts as proceedDeleteAccounts} from "../../service/service";
import {createActionAfterDeleteAccounts} from "../action/after-delete-accounts-action";
import {clearAccounts, getAllAccounts} from "../../service/acct";

export const deleteAccountsEffect = (ids: string[]) => {
    return async (dispatch: any) => {
        try {
            // delete accounts
            await proceedDeleteAccounts(ids);

            // clear accounts
            clearAccounts();
            await getAllAccounts();

            // dispatch after delete accounts action
            dispatch(createActionAfterDeleteAccounts(ids));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
