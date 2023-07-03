import React, {useState} from "react";
import {ReportExcelProps, ReportExcelPropsData, ReportExcelPropsDispatch} from "./props/report-excel-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {excelReport} from "../service/service";
import {createActionMessage} from "../oper/action/message-action";

const ReportExcel = (props: ReportExcelProps) => {
    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const companyName = props.company.name;

    const startChange = (event: any) => {
        const val = event.target.value;
        setStart(val);
    }

    const endChange = (event: any) => {
        const val = event.target.value;
        setEnd(val);
    }

    const runReport = () => {
        props.triggerReport(start, end, props.company.id);
    }


    return (
        <div className={'content'}>
            <h2>Excel Sheet {companyName}</h2>
            <div className="header edit bottom" style={{width: '400px'}}>
                Start:<input type={"text"} onChange={startChange} value={start}/>
                End:<input type={"text"} onChange={endChange} value={end}/>
                <button className="button" onClick={runReport}>Generate</button>
            </div>
        </div>
    )
}

const storeToProps = (store: IStore) : ReportExcelPropsData => {
    return {
        company: store.company!!
    }
}

const dispatch = (dispatch: any) : ReportExcelPropsDispatch => {
    return {
        triggerReport: (start: string, end: string, companyId: string) => {
            dispatch(excelReportEffect(start, end, companyId))
        }
    }
}

const excelReportEffect = (start: string, end: string, companyId: string) => {
    return async (dispatch: any) => {
        try {
            const {blob, fileName} = await excelReport({start, end, companyId})
            alert(fileName)
        } catch(err: any) {
            dispatch(createActionMessage(true, true, err.message));
        }
    }
}

export default connect(storeToProps, dispatch)(ReportExcel);
