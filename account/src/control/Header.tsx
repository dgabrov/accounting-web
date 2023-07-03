import React from "react";
import {HeaderProps, HeaderPropsData, HeaderPropsDispatch} from "./props/header-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_ACCOUNTS, LOCATION_COMPANIES, LOCATION_REPORTS, LOCATION_TRANSACTIONS} from "../state/constants";
import {logoutEffect} from "../oper/effect/logout-effect";

const Header = (props: HeaderProps) => {

    const transactions = (event : any ) => {
        event.preventDefault();

        props.transactions();
    }

    const accounts = (event : any ) => {
        event.preventDefault();

        props.accounts();
    }

    const reports = (event : any ) => {
        event.preventDefault();

        props.reports();
    }

    const logout = (event: any) => {
        event.preventDefault();

        props.logout();
    }

    const companies = (event: any) => {
        event.preventDefault();

        props.companies();
    }

    let login = props.user?.login;
    if (login !== undefined) {
        login = ` (${login})`;
    }
    const companyName = props.company?.name;

    const lis = [];
    lis.push(<li key={'0'}>{companyName}{login}</li>);
    if (props.user) {
        lis.push(<li key={'1'}><a href="/" onClick={companies}>Companies</a></li>);
    }

    if (props.company) {
        lis.push(<li key={'2'}><a href="/" onClick={transactions}>Transactions</a></li>);
        lis.push(<li key={'3'}><a href="/" onClick={accounts}>Accounts</a></li>);
        lis.push(<li key={'4'}><a href="/" onClick={reports}>Reports</a></li>);
    }

    if (props.user) {
        lis.push(<li key={'5'}><a href="/" onClick={logout}>Logout</a></li>);
    }

    return (
        <header>
            <div className="container">
                <h1 className="logo">Info</h1>

                <nav>
                    <ul>{lis}</ul>
                </nav>
            </div>
        </header>
    );
}

const storeToProps = (store: IStore): HeaderPropsData => {
    const company = store.company;
    const user = store.user;

    return {company, user}
}

const dispatch = (dispatch: any) : HeaderPropsDispatch => {
    return {
        reports: () => {
            dispatch(createActionLocation(LOCATION_REPORTS));
        },
        logout: () => {
            // clear the contents of the store
            dispatch(logoutEffect())
        },
        companies: () => {
            dispatch(createActionLocation(LOCATION_COMPANIES));
        },
        transactions: () => {
            dispatch(createActionLocation(LOCATION_TRANSACTIONS));
        },
        accounts: () => {
            dispatch(createActionLocation(LOCATION_ACCOUNTS));
        },
    }
}

export default connect(storeToProps, dispatch)(Header);
