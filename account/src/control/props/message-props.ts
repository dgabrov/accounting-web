export interface MessagePropsData {
    message: string;
    error: boolean;
    visible: boolean;
}

export interface MessagePropsDispatch {
    trigger: () => void;
}

export interface MessageProps extends  MessagePropsData, MessagePropsDispatch {}
