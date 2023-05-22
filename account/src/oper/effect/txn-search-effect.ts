import {createActionMessage} from "../action/message-action";
import {searchTransactions} from "../../service/service";
import {createActionTxnSearch} from "../action/txn-search-action";

export const txnSearchEffect = (companyId: string, search: string) => {
    return async (dispatch: any) => {
        try {
            const transactions = await searchTransactions(companyId, search);

            dispatch(createActionTxnSearch(transactions));
        } catch (err: any) {
            dispatch(createActionMessage(true, true, err.message))
        }
    }
}
