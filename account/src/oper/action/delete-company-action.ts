import {Action} from "redux";
import {IStore} from "../../state/store";

export const ACTION_DELETE_COMPANY : string = "delete-company";

export interface ActionDeleteCompany extends Action<String> {
    type: string;
    ids: string[]
}

export const createActionDeleteCompany = (ids: string[]): ActionDeleteCompany => {
    return {
        type: ACTION_DELETE_COMPANY,
        ids
    }
}

export const processActionDeleteCompany = (store: IStore, action: ActionDeleteCompany) : IStore => {
    const cdCompanyIds = action.ids;

    return { ...store, cdCompanyIds}
}
