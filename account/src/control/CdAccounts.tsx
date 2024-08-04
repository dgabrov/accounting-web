import React from "react";
import {CdAccountPropsDispatch, CdAccountsProps, CdAccountsPropsData} from "./props/cd-accounts-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_ACCOUNTS} from "../state/constants";
import {deleteAccountsEffect} from "../oper/effect/delete-accounts-effect";
import {IdMap} from "../util/tp";

const CdAccounts = (props: CdAccountsProps) => {


    const confirm = () => {
        const ids = props.accounts.map((account) => (account.accountId));
        const companyId = props.companyId;

        props.confirm(ids, companyId);
    }

    const cancel = () => {
        props.cancel();
    }

    const rows = props.accounts.map((account, index) => {
        const id = account.accountId;
        const nr = index + 1;

        return (
            <tr key={id}>
                <td>{nr}</td>
                <td>{account.code}</td>
                <td>{account.name}</td>
            </tr>
        );
    })

    return (
        <div className="content">
            <h1>Confirm delete accounts below</h1>
            <table className="table bottom">
                <thead>
                <tr>
                    <td>Nr</td>
                    <td>Code</td>
                    <td>Name</td>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
            <div className="edit">
                <button className="button" onClick={confirm}>Delete</button>
                <button className="button cancel" onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}

const storeToProps = (store: IStore) : CdAccountsPropsData => {
    const companyId = store.company!!.id
    const accounts = store.accounts;
    const ids = store.cdAccountIds;
    const idsMap = ids.reduce((acc: IdMap, id) => {
        acc[id] = "";
        return acc;
    }, {});

    const accountList = accounts.filter((account) => {
        const id = account.accountId;
        return idsMap.hasOwnProperty(id);
    });

    return {accounts: accountList, companyId};
}

const dispatch = (dispatch: any) : CdAccountPropsDispatch => {
    return {
        confirm: (ids: string[], companyId: string) => {
            dispatch(deleteAccountsEffect(ids, companyId))
        },
        cancel : () => {
            dispatch(createActionLocation(LOCATION_ACCOUNTS));
        }
    }
}

export default connect(storeToProps, dispatch)(CdAccounts);
