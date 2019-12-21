import { AnyAction, Reducer } from 'redux';
import { CHANGE_OPERATION } from '../actions/operationActions';


export interface OperationState {
	operation: string
}

const initialState: OperationState = {
	operation: 'RREF'
}

export const operationReducer: Reducer<OperationState> = 
	(state: OperationState = initialState, action: AnyAction): OperationState => {
	let operation: string = state.operation;
	switch(action.type) {
		case CHANGE_OPERATION: {
			operation = action.newOperation;
			break;
		}
	}
	return ({
		operation
	});
}

