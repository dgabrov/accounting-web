import {createActionUpdateAccount} from "../action/update-account-action";

export const updateAccountEffect = (id:string, adding: boolean) => {
    return async (dispatch: any) => {
        dispatch(createActionUpdateAccount(id, adding));
    }
}
