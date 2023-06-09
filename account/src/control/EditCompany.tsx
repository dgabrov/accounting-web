import React, {useEffect, useState} from 'react';
import {IStore} from "../state/store";
import {EditCompanyProps, EditCompanyPropsData, EditCompanyPropsDispatch} from "./props/edit-company-props";
import {connect} from "react-redux";
import {CompanyData} from "../data/company-data";
import {createActionLocation} from "../oper/action/location-action";
import {LOCATION_COMPANIES} from "../state/constants";
import {editCompanyEffect} from "../oper/effect/edit-company-effect";
import {processKeyDown} from "../util/key-operations";

const EditCompany = (props: EditCompanyProps) => {

    let nameField : any | null = null;

    const updateNameField = (newField : any) => {
        nameField = newField;
    }

    useEffect(() => {
        if (nameField !== null && nameField.focus) {
            nameField.focus();
            nameField.select();
        }
    }, [nameField])

    const addMessage = props.adding === true ? "Add" : "Edit";
    const [name, setName] = useState(props.company.name);
    const [endMonth, setEndMonth] = useState('' + props.company.month);
    const [endDay, setEndDay] = useState('' +props.company.month)


    const changeValue = (direction: string) => {
        return (event: any) => {
            const newValue = event.target.value;

            if (direction === "name") {
                setName(newValue);
            } else if (direction === "month") {
                setEndMonth(newValue);
            } else if (direction === "day") {
                setEndDay(newValue);
            }
        }
    }

    const save = () => {
        const adding = props.adding;
        const companyProvided = props.company;
        const data: CompanyData = {
            id: companyProvided.id,
            userId: companyProvided.userId,
            name: name,
            month: parseInt(endMonth),
            day: parseInt(endDay)
        }

        props.save(adding, data);
    }

    const cancel = () => {
        props.cancel();
    }

    return (
        <div className="content">
            <h1>{addMessage} Company</h1>
            <div className="region">
                <div className="item">
                    <div className="edit">Name</div>
                    <div className="edit">
                        <input type="text" value={name} onChange={changeValue("name")} ref={updateNameField} onKeyDown={processKeyDown(save, cancel, false)}/>
                    </div>
                </div>
                <div className="item">
                    <div className="edit">End Month</div>
                    <div className="edit"><input type="text" value={endMonth} onChange={changeValue("month")} onKeyDown={processKeyDown(save, cancel, false)}/></div>
                </div>
                <div className="item">
                    <div className="edit">End Day</div>
                    <div className="edit"><input type="text" value={endDay} onChange={changeValue("day")} onKeyDown={processKeyDown(save, cancel, false)}/></div>
                </div>
            </div>
            <div className="region">
                <div className="edit">
                    <button className="button" onClick={save}>Save</button>
                    <button className="button" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>);
}

const storeToProps = (store: IStore): EditCompanyPropsData => {
    // get the adding and the company id, then search for the company id and proceed
    const adding = store.addingCompany;
    const id = store.editCompanyId;
    const userId = store.user?.id!!;

    let company : CompanyData = {id, userId, day: 1, name: '', month: 1}

    if (!adding) {
        // search for the company data
        const comps = store.companies.filter((c) => (c.id === id));
        if (comps?.length > 0) {
            company = comps[0];
        }
    }

    return {adding, company};
}

const dispatch = (dispatch: any): EditCompanyPropsDispatch => {
    return {
        cancel: () => {
            dispatch(createActionLocation(LOCATION_COMPANIES));
        },
        save: (adding, data) => {
            dispatch(editCompanyEffect(adding, data));
        }
    }
}

export default connect(storeToProps, dispatch)(EditCompany);
