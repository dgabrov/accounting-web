import {Action} from "redux";
import {IStore} from "../../state/store";

export const ACTION_EDIT_COMPANY : string = "edit-company";

export interface ActionEditCompany extends Action<String> {
    type: string;
    id: string;
    adding: boolean;
}

export const createActionEditCompany = (adding: boolean, id: string): ActionEditCompany => {
    return {
        type: ACTION_EDIT_COMPANY,
        adding,
        id
    }
}

export const processActionEditCompany = (store: IStore, action: ActionEditCompany) : IStore => {
    const addingCompany = action.adding;
    const editCompanyId = action.id

    return {...store, addingCompany, editCompanyId}
}
