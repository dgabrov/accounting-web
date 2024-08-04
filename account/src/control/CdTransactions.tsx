import React, {useEffect, useState} from "react";
import {CdTransactionProps, CdTransactionPropsData, CdTransactionPropsDispatch} from "./props/cd-transaction-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {getTransactionString} from "../data/transaction-data";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_TRANSACTIONS} from "../state/constants";
import {AllMap, getIdMap, IdMap} from "../util/tp";
import {createActionMessage} from "../oper/action/message-action";
import {deleteTransactions} from "../service/service";
import {createActionAfterDeleteTransactions} from "../oper/action/after-delete-transactions-action";
import {AccountData} from "../data/account-data";

const CdTransactions = (props: CdTransactionProps) => {
    const startMap : AllMap<AccountData> = {}
    const [accountMap, setAccountMap] = useState(startMap);

    useEffect(() => {
        const newMap = props.allCompanyAccounts.reduce<AllMap<AccountData>>((acc, account) => {
            acc[account.accountId] = account;
            return acc
        }, {})

        setAccountMap(newMap)
    }, [props.allCompanyAccounts])

    const cancel = () => {
        props.cancel();
    }

    const confirm = () => {
        const ids = props.transactions.map((txn) => (txn.transactionId));

        props.confirm(ids);
    }


    const rows = props.transactions.map((txn, index) => {
        const nr = index + 1
        const strValue = getTransactionString(txn, accountMap);
        const id = txn.transactionId;

        return (
            <tr key={id}>
                <td>{nr}</td>
                <td>{strValue}</td>
            </tr>
        );
    })

    return (
        <div className="content">
            <h1>Confirm delete transactions below</h1>
            <table className="table bottom">
                <thead>
                <tr>
                    <td>Nr</td>
                    <td>Comments</td>
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
    );
}

const storeToProps = (store: IStore) : CdTransactionPropsData => {
    const ids = store.cdTransactionIds;
    const idMap: IdMap = getIdMap(ids);

    const transactions = store.transactions.filter((txn) => (idMap.hasOwnProperty(txn.transactionId)));
    const companyId = store.company!!.id
    const allCompanyAccounts = store.allCompanyAccounts

    return {transactions, companyId, allCompanyAccounts}
}

const dispatch = (dispatch: any) : CdTransactionPropsDispatch => {
    return {
        confirm: (ids: string[]) => {
            dispatch(deleteEffect(ids));
        },
        cancel: () => {
            dispatch(createActionLocation(LOCATION_TRANSACTIONS));
        }
    }
}

const deleteEffectAsync = async (dispatch: any, ids: string[]) => {
    try {
        // delete the values
        await deleteTransactions(ids);

        // create action after deletion and proceed
        dispatch(createActionAfterDeleteTransactions(ids));
    } catch(err: any) {
        dispatch(createActionMessage(true, true, err.message));
    }
}

const deleteEffect = (ids: string[]) => {
    return (dispatch: any) => {
        deleteEffectAsync(dispatch, ids).then(() =>{})
    }
}

export default connect(storeToProps, dispatch)(CdTransactions);
