import React from 'react';
import {MessageProps, MessagePropsData, MessagePropsDispatch} from "./props/message-props";
import {connect} from "react-redux";
import {IStore} from "../state/store";
import {createHideMessageAction} from "../oper/action/message-action";

const Message = (props: MessageProps) => {
    const trigger = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        props.trigger();
    }


    let res = <div></div>;

    const style = {color: 'green'}
    if (props.error) {
        style.color = 'red';
    }

    if (props.visible) {
        res = <div className="message" onClick={trigger}><div  style={style}>{props.message}</div></div>;
    }

    return (res);
}

const storeToProps = (store: IStore) : MessagePropsData => {
    return store.message;
}

const dispatch = (dispatch: any): MessagePropsDispatch => {
    return {
        trigger: () => {
            dispatch(createHideMessageAction());
        }
    }
}


export default connect(storeToProps, dispatch)(Message);
