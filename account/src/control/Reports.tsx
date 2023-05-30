import React from 'react';
import {ReportsProps, ReportsPropsData, ReportsPropsDispatch} from "./props/reports-props";
import {connect} from "react-redux";
import {IStore} from "../state/store";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_REPORT_BALANCE} from "../state/constants";

const Reports = (props : ReportsProps) => {

    const trialBalance = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        props.trialBalance();
    }

    const companyName = props.company?.name

    return(<div>
        <h2>Reports {companyName}</h2>
        <div>
            <ul>
                <li><a href='/' onClick={trialBalance}>Trial Balance</a></li>
            </ul>
        </div>
    </div>)
}

const storeToProps = (store: IStore) : ReportsPropsData => {
    return {
        company: store.company
    }
}

const dispatch = (dispatch: any) : ReportsPropsDispatch => {
    return {
        trialBalance(): void {
            dispatch(createActionLocation(LOCATION_REPORT_BALANCE));
        }
    }
}

export default connect(storeToProps, dispatch)(Reports);
