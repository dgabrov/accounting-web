import React, {useEffect, useState} from 'react';
import {
    EditTransactionProps,
    EditTransactionPropsData,
    EditTransactionPropsDispatch
} from "./props/edit-transaction-props";
import {IStore} from "../state/store";
import {TransactionData, TransactionPosition} from "../data/transaction-data";
import {connect} from "react-redux";
import {EMPTY_TXN_POS_COUNT} from "../util/constants";
import {getNewSequence, newGUID, updateTransaction} from "../service/service";
import {AccountData} from "../data/account-data";
import AsyncSelect from "react-select/async";
import CurrencyInput from "react-currency-input-field";
import "react-datepicker/dist/react-datepicker.css";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_TRANSACTIONS} from "../state/constants";
import {createActionMessage} from "../oper/action/message-action";
import {createActionAfterUpdateTransaction} from "../oper/action/after-update-transaction-action";
import {parseFloat} from "../util/calcs";
import {processKeyDown} from "../util/key-operations";

interface editPos {
    id: string;
    account: string;
    debit: string;
    credit: string;
}

const recalcValues = (pst: editPos[], reporter: (err: string) => void): { debit: number, credit: number } => {
    let debit: number = 0.0;
    let credit: number = 0.0;

    pst.forEach((position) => {
        const currentDebit = parseFloat(position.debit);
        debit += currentDebit;

        const currentCredit = parseFloat(position.credit);
        credit += currentCredit;
    })

    return {debit, credit};
}

const getEditPos = (adding: boolean, txn: TransactionData, guidGen: () => string): editPos[] => {
    // if adding, return two rows empty, if editing return all rows in transaction data positions
    const res: editPos[] = [];

    if (adding) {
        for (let i = 0; i < EMPTY_TXN_POS_COUNT; i++) {
            const id = guidGen();
            const account = '';
            const debit = '';
            const credit = '';

            res.push({id, account, debit, credit});
        }
    } else {
        const positions = txn.positions.map((current) => {
            return {
                id: current.transactionPositionId,
                account: current.accountId,
                debit: '' + current.debit,
                credit: '' + current.credit
            }
        });

        res.push(...positions);
    }

    return res;
}

const getAccountInfo = (accounts: AccountData[]): {
    list: { value: string, label: string }[],
    map: { [p: string]: { value: string, label: string } }
} => {
    const list: { value: string, label: string; }[] = [];
    const map: { [p: string]: { value: string, label: string } } = {};

    accounts.forEach((acc) => {
        const value = acc.accountId;
        const label = `(${acc.code}) - ${acc.name}`;

        const crt = {value, label}
        list.push(crt);
        map[value] = crt;
    })

    return {list, map}
}

const EditTransaction = (props: EditTransactionProps) => {

    let dateField: any | null = null;

    const updateDateField = (newField : any) => {
        dateField = newField;
    }

    useEffect(() => {
        if (dateField !== null && dateField.focus) {
            dateField.focus();
            dateField.select();
        }
    }, [dateField])

    const adding = props.adding;
    const addingMessage = adding ? "Add" : "Edit";
    const txn = props.transaction;
    const initialDate = txn.transactionDate || "";

    const positions: editPos[] = getEditPos(adding, txn, props.getGuid);

    const [comments, setComments] = useState(txn.comments);
    const [crtDate, setCrtDate] = useState(initialDate);
    const [pos, setPos] = useState(positions);
    const [totalDebit, setTotalDebit] = useState(0.0);
    const [totalCredit, setTotalCredit] = useState(0.0);

    const doRecalc = (items: editPos[], tdebit: (val: number) => void, tcredit: (val: number) => void) => {
        const {debit, credit} = recalcValues(items, props.reportError);
        tdebit(debit);
        tcredit(credit);
    }

    useEffect(() => {
        doRecalc(pos, setTotalDebit, setTotalCredit)
    }, [])

    const accInfo = getAccountInfo(props.allCompanyAccounts);

    const accountSelect = accInfo.list;
    const accountMap = accInfo.map;

    const doDelete = (id: string) => {
        return (event: any) => {
            event.preventDefault();

            // remove item with position id
            const newPos = pos.filter((pos) => {
                return pos.id !== id;
            });

            setPos(newPos);
            doRecalc(newPos, setTotalDebit, setTotalCredit);
        }
    }

    const doBalance = (id: string) => {
        return (event: any) => {
            event.preventDefault();
            let totalDebit = 0.0
            let totalCredit = 0.0

            // calculate totals without position id
            pos.forEach((current) => {
                const crtId = current.id
                if (crtId !== id) {
                    const valDebit = parseFloat(current.debit);
                    totalDebit += valDebit;

                    const valCredit = parseFloat(current.credit);
                    totalCredit += valCredit;
                } // if crtId is not our ID
            })

            // calculate the difference needed on debit or credit
            let resDebit = 0.0;
            let resCredit = 0.0;

            if (totalDebit > totalCredit) {
                resCredit = totalDebit - totalCredit;
            } else {
                resDebit = totalCredit - totalDebit;
            }

            // adjust values for position at location id
            const newPos = pos.map((current) => {
                const crtId = current.id;
                let res = current;

                if (crtId === id) {
                    res = {...current, debit: resDebit.toFixed(2), credit: resCredit.toFixed(2)}
                }

                return res;
            })

            // recalc
            doRecalc(newPos, setTotalDebit, setTotalCredit);

            // restore the values
            setPos(newPos);
        }
    }

    const add = (event: any) => {
        event.preventDefault();

        const newPos = [...pos];
        const newId = props.getGuid();

        newPos.push({id: newId, account: "", credit: "", debit: ""});

        setPos(newPos);
    }

    const save = () => {
        let txn = props.transaction;

        // the positions
        const allPositions: TransactionPosition[] = [];

        pos.forEach((p) => {
            const i: TransactionPosition = {
                transactionId: txn.transactionId,
                comments: '',
                sequence: getNewSequence(),
                transactionPositionId: p.id,
                debit: parseFloat(p.debit),
                credit: parseFloat(p.credit),
                accountId: p.account
            };

            allPositions.push(i);
        })

        // the general transaction
        const resTrans : TransactionData = {
            transactionDate: crtDate,
            transactionId: txn.transactionId,
            comments: comments,
            companyId: txn.companyId,
            sequence: txn.sequence,
            positions: allPositions
        }

        props.save(props.adding, resTrans);

    }

    const filterAccount = (id: string) => {
        return async (input: string): Promise<{ value: string, label: string }[]> => {
            const lowerInput = input.toLowerCase();

            return accountSelect.filter((acc) => {
                const lbl = acc.label.toLowerCase();

                return lbl.includes(lowerInput);
            })
        }
    }

    const accountChanged = (id: string) => {
        return (newValue: any) => {
            if (newValue === null) {
                newValue = {value: "", label: ""}
            }

            const newPos = pos.map((p) => {
                let res: editPos;
                const currentId = p.id;
                if (currentId === id) {
                    res = {...p};
                    res.account = newValue.value;
                } else {
                    res = p;
                }

                return res;
            });

            setPos(newPos);
        }
    }

    const currencyChange = (id: string, debit: boolean) => {
        return (value: string | undefined) => {
            const newPos = pos.map((current) => {
                const currentId = current.id;
                let res = current
                if (id === currentId) {
                    res = {...current};

                    // override the value for either debit or credit
                    let crt = value;
                    if (crt === undefined) {
                        crt = ""
                    }

                    if (debit) {
                        res.debit = crt;
                    } else {
                        res.credit = crt;
                    }
                }

                return res;
            });

            setPos(newPos);

            // ok, recalc now
            doRecalc(newPos, setTotalDebit, setTotalCredit);
        }
    }

    const controls = pos.map((p, index) => {
        let currentValue: { value: string, label: string } = {value: "", label: ""};
        if (accountMap.hasOwnProperty(p.account)) {
            currentValue = accountMap[p.account];
        }

        const id = p.id;

        return (
            <tr key={id}>
                <td>{index + 1}</td>
                <td className={'contains'}>
                    <AsyncSelect
                        loadOptions={filterAccount(id)}
                        value={currentValue}
                        defaultOptions={accountSelect}
                        onChange={accountChanged(id)}
                        styles={{
                            control: (baseStyles, state) => {
                                return {
                                    ...baseStyles,
                                    minWidth: '300px'
                                }
                            }
                        }}
                    />
                </td>
                <td className={'contains'}><CurrencyInput value={p.debit} style={{textAlign: 'right'}} decimalScale={2}
                                                          onValueChange={currencyChange(id, true)}
                                                          onKeyDown={processKeyDown(save, props.cancel, false)}/></td>
                <td className={'contains'}><CurrencyInput value={p.credit} style={{textAlign: 'right'}}
                                                          decimalScale={2} onValueChange={currencyChange(id, false)}
                                                          onKeyDown={processKeyDown(save, props.cancel, false)}/>
                </td>
                <td><a href="/" onClick={doDelete(p.id)}>Delete</a></td>
                <td><a href="/" onClick={doBalance(p.id)}>Balance</a></td>
            </tr>
        );
    })


    return (
        <div className="content">
            <h1>{addingMessage} Transaction</h1>
            <div className="region bottom">
                <div className="item">
                    <div className="edit">Date</div>
                    <div className="edit">
                        <input type="text" value={crtDate} onChange={(ev : any) => (setCrtDate(ev.target.value))} ref={updateDateField} onKeyDown={processKeyDown(save, props.cancel, false)}/>
                    </div>
                </div>
                <div className="item">
                    <div className="edit">Comments</div>
                    <div className="edit"><input type="text" value={comments} onChange={(evt: any) => {
                        setComments(evt.target.value)
                    }}  onKeyDown={processKeyDown(save, props.cancel, false)}/></div>
                </div>
            </div>
            <table className="table bottom">
                <thead>
                <tr>
                    <td>Nr</td>
                    <td>Account</td>
                    <td>Debit</td>
                    <td>Credit</td>
                    <td>Delete</td>
                    <td>Balance</td>
                </tr>
                </thead>
                <tbody>
                {controls}
                <tr>
                    <td colSpan={2}>Totals</td>
                    <td className='right'>{totalDebit.toFixed(2)}</td>
                    <td className='right'>{totalCredit.toFixed(2)}</td>
                    <td><a href="/" onClick={add}>Add</a></td>
                    <td>&nbsp;</td>
                </tr>
                </tbody>
            </table>
            <div className="edit">
                <button className="button" onClick={save}>Save</button>
                <button className="button" onClick={props.cancel}>Cancel</button>
            </div>
        </div>
    );
}

const storeToProps = (store: IStore): EditTransactionPropsData => {
    const adding = store.addingTransaction;
    const id = store.editTransactionId;
    const companyId = store.company?.id!!;
    const allCompanyAccounts = store.allCompanyAccounts

    let transaction  : TransactionData = {transactionId: id, positions: [], comments: '', sequence: 0, companyId, transactionDate: ""};

    if (adding) {
        transaction.sequence = getNewSequence();
    } else {
        const filtered = store.transactions.filter((txn) => (id === txn.transactionId));
        if (filtered.length > 0) {
            transaction = filtered[0];
        }
    }

    return {
        adding, transaction, companyId, allCompanyAccounts
    };
}

const dispatch = (dispatch: any): EditTransactionPropsDispatch => {
    return {
        save: (adding: boolean, data: TransactionData) => {
            dispatch(save(adding, data));
        },
        cancel: () => {
            dispatch(createActionLocation(LOCATION_TRANSACTIONS));
        },
        getGuid: (): string => {
            return newGUID();
        }, reportError: (err: string) => {
            dispatch(createActionMessage(true, true, err))
        }
    }
}

const saveEffect = async (dispatch: any, adding: boolean, data: TransactionData) => {
    try {
        // save the transaction
        await updateTransaction(adding, data);

        // then dispatch something to update the transaction in the provided list
        dispatch(createActionAfterUpdateTransaction(adding, data));
    } catch(err: any){
        dispatch(createActionMessage(true, true, err.message));
    }
}

const save = (adding: boolean, data:TransactionData) => {
    return (dispatch: any) => {
        saveEffect(dispatch, adding, data).then(()=>{});
    }
}

export default connect(storeToProps, dispatch)(EditTransaction);
