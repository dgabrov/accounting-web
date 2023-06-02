import React from 'react';
import {AccountReportDetail, AccountReportResult} from "../data/account-report-data";

const getRows = (details: AccountReportDetail[]): JSX.Element[] => {
    let rows: JSX.Element[] = []

    if (details.length > 0) {
        rows = details.map((d) => {
            const key = d.transactionPositionId;
            const date = d.date;
            const debit = d.amount.debit;
            const credit = d.amount.credit;
            const transactionAmount = d.transactionAmount;
            const comments = d.comments;
            const debitCodes = d.debitCodes;
            const creditCodes = d.creditCodes;
            const balance = d.currentBalance;


            return (
                <tr>
                    <td key={key}>{date}</td>
                    <td>{debit}</td>
                    <td>{credit}</td>
                    <td>{transactionAmount}</td>
                    <td>{comments}</td>
                    <td>{debitCodes}</td>
                    <td>{creditCodes}</td>
                    <td>{balance}</td>
                </tr>
            )
        })
    } else {
        rows.push(<tr key={'1'}>
            <td colSpan={8}></td>
        </tr>)
    }

    return rows
};
export const renderAccountReport = (result: AccountReportResult | null): JSX.Element => {
    let res = (<div></div>)

    if (result !== null) {
        const code = result.code
        const name = result.name

        const start = result.start.trim();
        const end = result.end.trim();

        let timelineMessage = ""
        if (end.length > 0) {
            timelineMessage = `between ${start} and ${end}`
        } else {
            timelineMessage = `since ${start}`
        }

        const startDebit = result.startBalance.debit
        const startCredit = result.startBalance.credit

        const rows = getRows(result.details)

        res = (
            <div>
                <h4>Account: {code} - {name}</h4>
                <h5>{timelineMessage}</h5>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <td>Date</td>
                        <td>Debit</td>
                        <td>Credit</td>
                        <td>Amount</td>
                        <td>Comments</td>
                        <td>Debit Accounts</td>
                        <td>Credit Accounts</td>
                        <td>Balance</td>
                    </tr>
                    <tr>
                        <td>Start</td>
                        <td>{startDebit}</td>
                        <td>{startCredit}</td>
                        <td colSpan={5}>&nbsp;</td>
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

