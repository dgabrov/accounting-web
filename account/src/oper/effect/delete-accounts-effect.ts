import {createActionMessage} from "../action/message-action";
import {deleteAccounts as proceedDeleteAccounts, loadAccounts} from "../../service/service";
import {createActionAfterDeleteAccounts} from "../action/after-delete-accounts-action";
import {createActionAllCompanyAccounts} from "../action/all-company-accounts-action";

export const deleteAccountsEffect = (ids: string[], companyId: string) => {
    return async (dispatch: any) => {
        try {
            // delete accounts
            await proceedDeleteAccounts(ids);

            // get all the accounts for company
            const allCompanyAccounts = await loadAccounts(companyId);

            // dispatch after delete accounts action
            dispatch(createActionAllCompanyAccounts(allCompanyAccounts));
            dispatch(createActionAfterDeleteAccounts(ids));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
