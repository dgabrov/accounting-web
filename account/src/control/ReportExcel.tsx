import React, {useEffect, useState} from "react";
import {ReportExcelProps, ReportExcelPropsData, ReportExcelPropsDispatch} from "./props/report-excel-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {excelReport} from "../service/service";
import {createActionMessage} from "../oper/action/message-action";
import {createUpdateReportExcelFormsAction} from "../oper/action/update-report-excel-forms";

const ReportExcel = (props: ReportExcelProps) => {
    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const companyName = props.company.name;


    useEffect(() => {
        setStart(props.form.start)
        setEnd(props.form.end)
    }, [props.form.start, props.form.end])

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

    const blurForm = (event: any) => {
        props.updateFormData(start, end)
    }


    return (
        <div className={'content'}>
            <h2>Excel Sheet {companyName}</h2>
            <div className="header edit bottom" style={{width: '400px'}}>
                Start:<input type={"text"} onChange={startChange} value={start} onBlur={blurForm}/>
                End:<input type={"text"} onChange={endChange} value={end} onBlur={blurForm}/>

                <button className="button ok" onClick={runReport}>Generate</button>
            </div>
        </div>
    )
}

const storeToProps = (store: IStore) : ReportExcelPropsData => {
    let reportExcelForm = store.reportExcelForm;

    let start = reportExcelForm.start;
    let end = reportExcelForm.end;

    return {
        company: store.company!!,
        form: {
            start,
            end
        }
    }
}

const dispatch = (dispatch: any) : ReportExcelPropsDispatch => {
    return {
        triggerReport: (start: string, end: string, companyId: string) => {
            dispatch(excelReportEffect(start, end, companyId))
        },
        updateFormData: (start: string, end: string) => {
            let form = {start, end};

            dispatch(createUpdateReportExcelFormsAction(form))
        }
    }
}

const excelReportEffect = (start: string, end: string, companyId: string) => {
    return async (dispatch: any) => {
        try {
            const {blob, fileName} = await excelReport({start, end, companyId})
            download(blob, fileName);
        } catch(err: any) {
            dispatch(createActionMessage(true, true, err.message));
        }
    }
}

const download = (blob : Blob, name: string) => {
    const a: HTMLAnchorElement = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);

    const url: string = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = name;

    a.click();

    window.URL.revokeObjectURL(url);
    a.parentElement?.removeChild(a);
}

/*
const download = async ({filename, blob}: {filename: string; blob: Blob}) => {
  const a: HTMLAnchorElement = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  const url: string = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = `${filename}.md`;

  a.click();

  window.URL.revokeObjectURL(url);
  a.parentElement?.removeChild(a);
};
 */

export default connect(storeToProps, dispatch)(ReportExcel);
