import React, {useState} from 'react';
import {CompaniesProps, CompaniesPropsData, CompaniesPropsDispatch} from "./props/companies-props";
import {IStore} from "../state/store";
import {connect} from "react-redux";
import {CompanyData} from "../data/company-data";
import {createActionEditCompany} from "../oper/action/edit-company-action";
import {newGUID} from "../service/service";
import {createActionLocation} from "../oper/action/location-action";
import {getMonth, LOCATION_CD_COMPANIES, LOCATION_EDIT_COMPANY} from "../state/constants";
import {createActionDeleteCompany} from "../oper/action/delete-company-action";
import {createActionMessage} from "../oper/action/message-action";
import {IdMap} from "../util/tp";
import {chooseCompanyEffect} from "../oper/effect/choose-company-effect";

const Companies = (props: CompaniesProps) => {

    const startState: IdMap = {}
    const [selected, setSelected] = useState(startState)

    const selectCompany = (id: string): CompanyData => {
        const cmp = props.companies.filter((company) => (company.id === id));

        return cmp[0];
    }

    const selectCheckbox = (id: string) => {
        return (event: any) => {
            const checked = event?.target?.checked;
            const newSelected = {...selected}

            if (checked === true) {
                newSelected[id] = "";
            } else {
                delete newSelected[id];
            }

            setSelected({...newSelected})
        }
    }

    const triggerEdit = (id: string) => {
        return (event: any) => {
            event.preventDefault();

            props.edit(id);
        }
    }

    const triggerSelect = (id: string) => {
        return (event: any) => {
            event.preventDefault();

            const company = selectCompany(id);
            props.choose(company);
        }
    }

    const add = () => {
        props.add();
    }

    const del = () => {
        props.remove(Object.keys(selected));
    }

    const items = props.companies.map((company, index) => {


        const companyId = company.id;
        const name = company.name;
        const month = company.month;
        const day = company.day;

        const sel = selected.hasOwnProperty(companyId);

        const currentMonth = getMonth(month);
        // set checked for the checkbox

        return (
            <tr key={companyId}>
                <td>{index + 1}</td>
                <td><input type="checkbox" onChange={selectCheckbox(companyId)} checked={sel}/></td>
                <td><a href="/" onClick={triggerEdit(companyId)}>Edit</a></td>
                <td><a href="/" onClick={triggerSelect(companyId)}>{name}</a></td>
                <td>{currentMonth} {day}</td>
            </tr>
        )
    })

    return (
        <div className="content">
            <h1>Select company</h1>
            <table className="table">
                <thead>
                <tr>
                    <td>Nr</td>
                    <td>&nbsp;</td>
                    <td>Edit</td>
                    <td>Name</td>
                    <td>End Date</td>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
            <div className="edit">
                <button className="button" onClick={add}>Add</button>
                <button className="button" onClick={del}>Delete</button>
            </div>
        </div>
    );
}

const storeToProps = (store: IStore): CompaniesPropsData => {
    const companies = store.companies;

    return {companies};
}

const dispatch = (dispatch: any): CompaniesPropsDispatch => {
    return {
        edit: (id: string) => {
            dispatch(createActionEditCompany(false, id));
            dispatch(createActionLocation(LOCATION_EDIT_COMPANY));
        },
        add: () => {
            dispatch(createActionEditCompany(true, newGUID()));
            dispatch(createActionLocation(LOCATION_EDIT_COMPANY));
        },
        remove: (ids: string[]) => {
            if (ids.length > 0) {
                dispatch(createActionDeleteCompany(ids));
                dispatch(createActionLocation(LOCATION_CD_COMPANIES));
            } else {
                dispatch(createActionMessage(true, true, 'Please select at least a company you wish to delete'));
            }
        },
        choose: (data: CompanyData) => {
            dispatch(chooseCompanyEffect(data.id));
        }
    }
}

export default connect(storeToProps, dispatch)(Companies);
