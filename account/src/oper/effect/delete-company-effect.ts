import {createActionMessage} from "../action/message-action";
import {deleteCompanies} from "../../service/service";
import {createActionAfterDeleteCompanies} from "../action/after-delete-companies-action";

export const deleteCompanyEffect = (ids: string[]) => {
    return async (dispatch: any) => {
        try {
            // first delete the companies
            await deleteCompanies(ids);

            // then remove them from the collection in the store as well
            dispatch(createActionAfterDeleteCompanies(ids));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
