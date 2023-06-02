import {createActionMessage} from "../action/message-action";
import {logoutUser} from "../../service/service";
import {createActionClearStore} from "../action/clear-store-action";
import {setToken} from "../../service/token";
import {createActionLocation} from "../action/location-action";
import {LOCATION_LOGIN} from "../../state/constants";

export const logoutEffect = () => {
    return async (dispatch: any) => {
        try {
            // logout
            try {
                await logoutUser();
            } catch (e) {
                console.log('failed to logout user: ' + e)
            }

            // clear the store
            dispatch(createActionClearStore());

            // delete the token from the repo
            setToken('')

            // move to the login page
            dispatch(createActionLocation(LOCATION_LOGIN));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
