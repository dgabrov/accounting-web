import React, {useEffect, useState} from 'react';
import {
    ReportTransactionProps,
    ReportTransactionPropsData,
    ReportTransactionPropsDispatch
} from "./props/report-transaction-props";
import {IStore} from "../state/store";
import {createActionMessage} from "../oper/action/message-action";
import {connect} from "react-redux";
import {transactionReport} from "../service/service";
import {TransactionReportRequest, TransactionReportResult} from "../data/account-report-data";
import {TransactionData} from "../data/transaction-data";
import {AllMap} from "../util/tp";
import {AccountData} from "../data/account-data";

const ReportTransaction = (props: ReportTransactionProps) => {

    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('');
    const [result, setResult] = useState<TransactionReportResult | null>(null);
    const [accountMap, setAccountMap] = useState<AllMap<AccountData>>({})

    // populate the account map
    useEffect(() => {
        const acctMap = props.allCompanyAcounts.reduce<AllMap<AccountData>>((acc, account) => {
            acc[account.accountId] = account;
            return acc
        }, {})

        setAccountMap(acctMap);
    }, [props.allCompanyAcounts])

    const startChange = (ev: any) => {
        setStart(ev.target.value)
    }

    const endChange = (ev: any) => {
        setEnd(ev.target.value)
    }

    const runReport = async () => {
        try {
            const companyId = props.company.id;

            // gather information
            const request: TransactionReportRequest = {
                start, end, companyId
            };

            const response = await transactionReport(request)
            setResult(response);
        } catch (err: any) {
            props.triggerError(err);
        }
    }

    const companyName = props.company.name;

    const renderedResponse = renderResponse(companyName, result, accountMap);

    return (
        <div className={'content '}>
            <h2>Transaction Report {companyName}</h2>
            <div className="header edit bottom" style={{width: '400px'}}>
                Start:<input type={"text"} onChange={startChange} value={start}/>
                End:<input type={"text"} onChange={endChange} value={end}/>
                <button className="button ok" onClick={runReport}>Generate</button>
            </div>

            {renderedResponse}

            <h1>&nbsp;</h1>
        </div>
    )
}

const storeToProps = (store: IStore): ReportTransactionPropsData => {
    return {
        accountTypes: store.accountTypes,
        allCompanyAcounts: store.allCompanyAccounts,
        company: store.company!!
    }
}

const dispatch = (dispatch: any): ReportTransactionPropsDispatch => {
    return {
        triggerError: (err: any) => {
            const message = err.message ? err.message : '' + err
            dispatch(createActionMessage(true, true, message));
        }
    }
}


function renderResponse(companyName: string, result: TransactionReportResult | null, accountMap: AllMap<AccountData>): JSX.Element {
    let res = (<div></div>);

    if (result != null) {
        const r = result!!;
        let timelineMessage = '';
        const start = r.start
        const end = r.end

        if (end.length > 0) {
            timelineMessage = `Between ${start} and ${end}`
        } else {
            timelineMessage = `Since ${start}`
        }

        const rows: JSX.Element[] = getDetailRows(r.transactions, accountMap);

        res = (
            <div>
                <h4>Transaction Report for {companyName}</h4>
                <h5>{timelineMessage}</h5>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <td rowSpan={2} className={'center'}>Date</td>
                        <td rowSpan={2}>Comments</td>
                        <td rowSpan={2}>Total</td>
                        <td colSpan={2} className={'center'}>Debit</td>
                        <td colSpan={2} className={'center'}>Credit</td>
                    </tr>
                    <tr>
                        <td>Account</td>
                        <td className={'right'}>Amount</td>
                        <td>Account</td>
                        <td className={'right'}>Amount</td>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    return res;
}

const getDetailRows = (transactions: TransactionData[], accountMap: AllMap<AccountData>): JSX.Element[] => {
    const r: JSX.Element[] = []
    if (transactions.length === 0) {
        r.push(
            <tr>
                <td className={'noItemsRow'}>No items...</td>
            </tr>
        );
    } else {
        transactions.forEach((txn, index) => {
            const even = index % 2 === 0
            const items = getDetailRowItem(txn, accountMap, even);

            r.push(...items);
        })
    }

    return r;
};

const getDetailRowItem = (txn: TransactionData, accountMap: AllMap<AccountData>, even: boolean): JSX.Element[] => {
    const rows: JSX.Element[] = [];
    // there are at least 2 or else would not save
    const pos = txn.positions;

    const debitPos = pos.filter((p) => (p.debit !== 0));
    const creditPos = pos.filter((p) => (p.credit !== 0));
    const nrDebit = debitPos.length
    const nrCredit = creditPos.length;
    const totalAmount = pos.reduce<number>((acc, p) => (acc + p.debit), 0);

    const steps = nrDebit > nrCredit ? nrDebit : nrCredit;

    // when those become true, it is considered that I finished processing the debit / credit entries
    let debitFinished = false;
    let creditFinished = false;


    for (let i = 0; i < steps; i++) {
        const row = []
        if (i === 0) {
            row.push(<td className={'center'} rowSpan={steps}>{txn.transactionDate}</td>)
            row.push(<td className={'comments'} rowSpan={steps}>{txn.comments}</td>)
            row.push(<td className={'right'} rowSpan={steps}>{totalAmount.toFixed(2)}</td>)
        }

        if (i < nrDebit) {
            const p = debitPos[i];
            const msg = getAccountMsg(accountMap[p.accountId])
            row.push(<td>{msg}</td>)
            row.push(<td className={'right'}>{p.debit.toFixed(2)}</td>)
        } else if (!debitFinished) {
            const rowSpan = steps - nrDebit

            if (rowSpan > 0) {
                row.push(<td rowSpan={rowSpan} colSpan={2}>&nbsp;</td>)
            }

            debitFinished = true;
        }

        if (i < nrCredit) {
            const p = creditPos[i];
            const msg = getAccountMsg(accountMap[p.accountId])
            row.push(<td>{msg}</td>)
            row.push(<td className={'right'}>{p.credit.toFixed(2)}</td>)
        } else if (!creditFinished) {
            const rowSpan = steps - nrCredit;

            if (rowSpan > 0) {
                row.push(<td rowSpan={rowSpan} colSpan={2}>&nbsp;</td>)
            }

            creditFinished = true;
        }

        const className = even ? 'even' : 'odd';
        rows.push(<tr className={className}>{row}</tr>)
    }


    return rows;
}

const getAccountMsg = (acct: AccountData) => {
    return `${acct.code} ${acct.name}`;
};

export default connect(storeToProps, dispatch)(ReportTransaction);
