import {createActionMessage} from "../action/message-action";
import {loadAccounts} from "../../service/service";
import {createActionChooseCompany} from "../action/choose-company-action";
import {createActionAllCompanyAccounts} from "../action/all-company-accounts-action";

export const chooseCompanyEffect = (companyId: string) => {
    return async (dispatch: any) => {
        try {
            // get the accounts again and populate the store
            const companyAllAccounts = await loadAccounts(companyId);

            dispatch(createActionAllCompanyAccounts(companyAllAccounts));
            dispatch(createActionChooseCompany(companyId));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
