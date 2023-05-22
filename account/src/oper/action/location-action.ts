import {Action} from "redux";
import {IStore} from "../../state/store";

export const ACTION_LOCATION : string = "location";

export interface ActionLocation extends Action<String> {
    type: string;
    location:string
}

export const createActionLocation = (location: string): ActionLocation => {
    return {
        type: ACTION_LOCATION,
        location
    }
}

export const processActionLocation = (store: IStore, action: ActionLocation) : IStore => {
    const location = action.location;

    return {...store, location}
}
