import React, {useEffect, useState} from 'react';
import {TransactionsProps, TransactionsPropsData, TransactionsPropsDispatch} from "./props/transactions-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {TransactionData, TransactionPosition} from "../data/transaction-data";
import {createActionCdTransactions} from "../oper/action/cd-transactions_action";
import {txnSearchEffect} from "../oper/effect/txn-search-effect";
import {createActionUpdateTransaction} from "../oper/action/update-transaction-action";
import {newGUID} from "../service/service";
import {IdMap} from "../util/tp";
import {createActionMessage} from "../oper/action/message-action";
import {createActionTrim} from "../oper/action/trim";

const Transactions = (props: TransactionsProps) => {

    let searchField : any|null = null

    const updateSearchField = (newField : any|null) => {
        if (searchField === null && newField !== null) {
            searchField = newField
        }
    }

    useEffect(() => {
        if (searchField !== null && searchField.focus) {
            searchField.focus();
            searchField.select();
        }
    }, [searchField])

    const accMap = props.allCompanyAccounts.reduce<IdMap>((acc, acct) => {
        const id = acct.accountId;
        acc[id] = acct.code;
        return acc;
    }, {});


    const [search, setSearch] = useState(props.search);
    const [selected, setSelected] = useState({});

    useEffect(()=>{
        setSelected({});
    }, [props.transactions]);

    const getAccountList = (positions: TransactionPosition[], debit: boolean) : string => {
        const codes: string[] = []
        positions.forEach((pos) => {
            const code = accMap[pos.accountId] || 'none';

            if ((debit && pos.debit !== 0) || (!debit && pos.credit !== 0)) {
                codes.push(code)
            }
        });

        return codes.join(",");
    }

    const triggerSearch = () => {
        props.doSearch(props.companyId, search);
    }

    const triggerTrim = () => {
        props.trim();
    }

    const add = () => {
        props.add();
    }

    const doDelete = () => {
        const selectedIds = Object.keys(selected);
        props.delete(selectedIds);
    }

    const edit = (txn : TransactionData) => {
        return (event: any) => {
            event.preventDefault();
            props.edit(txn);
        }
    }

    const check = (id: string) => {
        return ()=>{
            const newSelected: IdMap = {...selected};
            if (selected.hasOwnProperty(id)) {
                delete newSelected[id];
            } else {
                newSelected[id] = "";
            }

            setSelected(newSelected);
        }
    }



    let rows = [<tr key={1}><td colSpan={8}>No transactions...</td></tr>];

    if (props.transactions?.length > 0) {
        rows = props.transactions.map((txn, index) => {

            const total = txn.positions.reduce((acc, pos) => {return acc + pos.debit}, 0.0)
            const formattedTotal = total.toFixed(2)
            const id = txn.transactionId;
            const nr = index + 1;
            let debitAccounts = getAccountList(txn.positions, true);
            let creditAccounts = getAccountList(txn.positions, false);

            let strDate = '' + txn.transactionDate;
            let comments = txn.comments;

            return (
                <tr key={id}>
                    <td>{nr}</td>
                    <td><input type="checkbox" onChange={check(id)} checked={selected.hasOwnProperty(id)}/></td>
                    <td><a href="/" onClick={edit(txn)}>Edit</a></td>
                    <td>{strDate}</td>
                    <td>{comments}</td>
                    <td>{debitAccounts}</td>
                    <td>{creditAccounts}</td>
                    <td style={{textAlign: 'right'}}>{formattedTotal}</td>
                </tr>
            );
        })
    }

    return (
        <div className="content">
            <h1>Transactions</h1>
            <div className="header edit bottom">
                Search: <input type="text"
                               value={search}
                               onChange={(e) => {setSearch(e.target.value)}}
                               ref={updateSearchField} />

                <button className="button ok" onClick={triggerSearch}>Search</button>
                <button className="button" onClick={triggerTrim}>Trim</button>
            </div>
            <div style={{fontSize: '0.8em'}}>Sample: [date: (date1-date2)] [accounts:(code1, code2)] comment1, comment2</div>
            <div style={{fontSize: '0.8em'}}>parantheses are mandatory when using construct for date and accounts</div>
            <div>&nbsp;</div>
            <table className="table">
                <thead>
                <tr>
                    <td>Nr</td>
                    <td>&nbsp;</td>
                    <td>Edit</td>
                    <td>Date</td>
                    <td>Comments</td>
                    <td>Debit</td>
                    <td>Credit</td>
                    <td style={{textAlign: 'right'}}>Amount</td>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
            <div className="edit">
                <button className="button" onClick={add}>Add</button>
                <button className="button" onClick={doDelete}>Delete</button>
            </div>
        </div>
    );
}

const storeToProps = (store: IStore): TransactionsPropsData => {
    return {
        search: '',
        transactions: store.transactions,
        companyId: store.company?.id!!,
        allCompanyAccounts: store.allCompanyAccounts
    }
}

const dispatch = (dispatch: any): TransactionsPropsDispatch => {
    return {
        edit: (data: TransactionData) => {
            dispatch(createActionUpdateTransaction(false, data.transactionId));
        },
        add: () => {
            const id = newGUID();

            dispatch(createActionUpdateTransaction(true, id));
        },
        delete: (ids: string[]) => {
            if (ids?.length > 0) {
                // trigger action
                dispatch(createActionCdTransactions(ids));
            } else {
                dispatch(createActionMessage(true, true, "Please select at least one transaction to delete"))
            }
        },
        doSearch: (companyId: string, search: string) => {
            dispatch(txnSearchEffect(companyId, search));
        },
        trim :() => {
            dispatch(createActionTrim());
        }
    }
}

export default connect(storeToProps, dispatch)(Transactions);
