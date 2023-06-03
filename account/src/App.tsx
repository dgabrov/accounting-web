import React, {Dispatch} from 'react';
import EditTransaction from "./control/EditTransaction";
import Message from "./control/Message";
import Accounts from "./control/Accounts";
import {
    LOCATION_ACCOUNTS,
    LOCATION_CD_ACCOUNTS,
    LOCATION_CD_COMPANIES,
    LOCATION_CD_TRANSACTIONS,
    LOCATION_COMPANIES,
    LOCATION_EDIT_ACCOUNT,
    LOCATION_EDIT_COMPANY,
    LOCATION_EDIT_TRANSACTION,
    LOCATION_LOGIN, LOCATION_REPORT_ACCOUNT, LOCATION_REPORT_BALANCE, LOCATION_REPORT_TRANSACTION,
    LOCATION_REPORTS,
    LOCATION_TRANSACTIONS
} from "./state/constants";
import CdAccounts from "./control/CdAccounts";
import CdTransactions from "./control/CdTransactions";
import Companies from "./control/Companies";
import CdCompanies from "./control/CdCompanies";
import EditAccount from "./control/EditAccount";
import EditCompany from "./control/EditCompany";
import Header from "./control/Header";
import Login from "./control/Login";
import Transactions from "./control/Transactions";
import {IStore} from "./state/store";
import {AppProps, AppPropsData, AppPropsDispatch} from "./control/props/app-props";
import {Action} from "redux";
import {connect} from "react-redux";
import Reports from "./control/Reports";
import {AllMap} from "./util/tp";
import ReportBalance from "./control/ReportBalance";
import ReportAccount from "./control/ReportAccount";
import ReportTransaction from "./control/ReportTransaction";

const componentMap: AllMap<JSX.Element> = {}
componentMap[LOCATION_ACCOUNTS] = <Accounts/>;
componentMap[LOCATION_CD_ACCOUNTS] = <CdAccounts/>;
componentMap[LOCATION_CD_TRANSACTIONS] = <CdTransactions/>;
componentMap[LOCATION_CD_COMPANIES] = <CdCompanies/>;
componentMap[LOCATION_COMPANIES] = <Companies/>;
componentMap[LOCATION_EDIT_ACCOUNT] = <EditAccount/>;
componentMap[LOCATION_EDIT_COMPANY] = <EditCompany/>;
componentMap[LOCATION_EDIT_TRANSACTION] = <EditTransaction/>;
componentMap[LOCATION_LOGIN] = <Login />;
componentMap[LOCATION_TRANSACTIONS] = <Transactions />;
componentMap[LOCATION_REPORTS] = <Reports />;
componentMap[LOCATION_REPORT_BALANCE] = <ReportBalance />;
componentMap[LOCATION_REPORT_ACCOUNT] = <ReportAccount />;
componentMap[LOCATION_REPORT_TRANSACTION] = <ReportTransaction />;



const App = (props: AppProps) => {

    let control : JSX.Element = <div>default control</div>;
    const location = props.location;
    if (componentMap.hasOwnProperty(location)) {
        control = componentMap[location];
    }

    return (
        <div>
            <div><Header /></div>
            <div><Message /></div>
            <div>{control}</div>
        </div>
    );
}

const storeToProps = (store: IStore) : AppPropsData => {
    return {
        location: store.location
    }
}

const dispatch = (dispatch : Dispatch<Action<string>>) : AppPropsDispatch => {
    return {};
}

export default connect(storeToProps, dispatch)(App);
