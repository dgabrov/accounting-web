import React from 'react';
import {AccountReportDetail, AccountReportResult} from "../data/account-report-data";
import {AllMap} from "../util/tp";
import {AccountTypeData} from "../data/account-type-data";

const getRows = (details: AccountReportDetail[]): JSX.Element[] => {
    let rows: JSX.Element[] = []

    if (details?.length > 0) {
        rows = details.map((d) => {
            const key = d.transactionPositionId;
            const date = d.date;
            const debit = d.amount.debit.toFixed(2);
            const credit = d.amount.credit.toFixed(2);
            const transactionAmount = d.transactionAmount.toFixed(2);
            const comments = d.comments;
            const debitCodes = d.debitCodes;
            const creditCodes = d.creditCodes;
            const balance = d.currentBalance.toFixed(2);


            return (
                <tr>
                    <td key={key} className={'center'}>{date}</td>
                    <td className={'right'}>{debit}</td>
                    <td className={'right'}>{credit}</td>
                    <td className={'right'}>{transactionAmount}</td>
                    <td className={'comments'}>{comments}</td>
                    <td>{debitCodes}</td>
                    <td>{creditCodes}</td>
                    <td className={'right'}>{balance}</td>
                </tr>
            )
        })
    } else {
        rows.push(<tr key={'1'}>
            <td colSpan={8} className={'noItemsRow'}>No items...</td>
        </tr>)
    }

    return rows
};
export const renderAccountReport = (result: AccountReportResult | null, accountTypeMap: AllMap<AccountTypeData>): JSX.Element => {
    let res = (<div></div>)

    if (result !== null) {
        const code = result.code
        const name = result.name
        const accountType = accountTypeMap[result.accountTypeCd]?.name;

        const start = result.start.trim();
        const end = result.end.trim();

        let timelineMessage = ""
        if (end.length > 0) {
            timelineMessage = `Between ${start} and ${end}`
        } else {
            timelineMessage = `Since ${start}`
        }

        const startDebit = result.startBalance.debit
        const startCredit = result.startBalance.credit

        const rows = getRows(result.details)

        const totalsRow = (<tr className={'right total'}>
            <td>Totals:</td>
            <td>{result.totals.debit.toFixed(2)}</td>
            <td>{result.totals.credit.toFixed(2)}</td>
            <td colSpan={5}></td>
        </tr>)

        const balanceRow = (
            <tr className={'right total'}>
                <td className={'nowrap'}>End Balance:</td>
                <td>{result.finalBalance.debit.toFixed(2)}</td>
                <td>{result.finalBalance.credit.toFixed(2)}</td>
                <td colSpan={5}></td>
            </tr>
        )

        res = (
            <div>
                <h4>Account: {code} - {name} ({accountType})</h4>
                <h5>{timelineMessage}</h5>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <td rowSpan={2} className={'center'}>Date</td>
                        <td colSpan={2} className={'center'}>Amount</td>
                        <td rowSpan={2} className={'center'}>Transaction<br/>Amount</td>
                        <td rowSpan={2}>Comments</td>
                        <td colSpan={2} className={'center'}>Other Accounts</td>
                        <td rowSpan={2} className={'right'}>Balance</td>
                    </tr>
                    <tr>
                        <td className={'right'}>Debit</td>
                        <td className={'right'}>Credit</td>
                        <td className={'right'}>Debit</td>
                        <td className={'right'}>Credit</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={'total right'}>
                        <td className={'right nowrap'}>Start Balance:</td>
                        <td className={'right'}>{startDebit.toFixed(2)}</td>
                        <td className={'right'}>{startCredit.toFixed(2)}</td>
                        <td colSpan={5}>&nbsp;</td>
                    </tr>
                    {rows}
                    {totalsRow}
                    {balanceRow}
                    </tbody>
                </table>
            </div>
        );
    }

    return res;
}

