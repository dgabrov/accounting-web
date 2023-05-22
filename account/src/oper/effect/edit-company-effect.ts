import {createActionMessage} from "../action/message-action";
import {CompanyData} from "../../data/company-data";
import {createActionLocation} from "../action/location-action";
import {LOCATION_COMPANIES} from "../../state/constants";
import {updateCompany} from "../../service/service";
import {createActionUpdateCompany} from "../action/update-company-action";

export const editCompanyEffect = (adding: boolean, data: CompanyData) => {
    return async (dispatch: any) => {
        try {
            // update the company in the service
            await updateCompany(adding, data);

            // trigger the dispatch action to the update company in the store
            dispatch(createActionUpdateCompany(adding, data));

            // set the location back to companies
            dispatch(createActionLocation(LOCATION_COMPANIES));
        } catch (err: any){
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
