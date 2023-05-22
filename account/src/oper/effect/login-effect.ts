import {createActionMessage} from "../action/message-action";
import {LoginData} from "../../data/login-data";
import {UserData} from "../../data/user-data";
import {fetchAccountTypes, getCompanies, loginUser} from "../../service/service";
import {CompanyData} from "../../data/company-data";
import {createActionLogin} from "../action/login-action";
import {createActionCompanies} from "../action/companies-action";
import {createActionLocation} from "../action/location-action";
import {LOCATION_COMPANIES} from "../../state/constants";
import {AccountTypeData} from "../../data/account-type-data";
import {createActionAccountTypes} from "../action/action-account-types";

export const loginEffect = (data: LoginData) => {
    return async (dispatch: any) => {
        try {
            // get the login user
            const user: UserData = await loginUser(data);

            // get the companies for the user - this will retrieve the token and the user is resolved from the token
            const companies: CompanyData[] = await getCompanies();

            // get account types
            const accountTypes : AccountTypeData[] = await fetchAccountTypes();

            // trigger the actions for user login and companies
            dispatch(createActionLogin(user));
            dispatch(createActionAccountTypes(accountTypes));
            dispatch(createActionCompanies(companies));
            dispatch(createActionLocation(LOCATION_COMPANIES));

        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
