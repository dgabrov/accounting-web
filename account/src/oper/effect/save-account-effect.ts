import {AccountData} from "../../data/account-data";
import {loadAccounts, updateAccount} from "../../service/service";
import {createActionAllCompanyAccounts} from "../action/all-company-accounts-action";
import {createActionAfterUpdateAccount} from "../action/after-update-account";
import {createActionMessage} from "../action/message-action";

export const createSaveAccountEffect = (data: AccountData, adding: boolean) => {
    return async (dispatch: any) => {
        try {
            // update the account data
            await updateAccount(adding, data);

            // refresh account list
            const allCompanyAccounts = await loadAccounts(data.companyId);
            dispatch(createActionAllCompanyAccounts(allCompanyAccounts));

            // now with this, process after update account
            dispatch(createActionAfterUpdateAccount(adding, data));
        } catch (err: any) {
            dispatch(createActionMessage(true, true, err.message));
        }
    }
}

