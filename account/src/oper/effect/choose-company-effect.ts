import {createActionMessage} from "../action/message-action";
import {deleteCompanies, loadAccounts} from "../../service/service";
import {createActionAfterDeleteCompanies} from "../action/after-delete-companies-action";
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
