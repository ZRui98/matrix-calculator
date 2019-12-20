import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {dimensionReducer, MatricesState} from '../reducers/matrixReducers';
import {operationReducer, OperationState} from '../reducers/operationReducers';

export interface AppState {
	matricesState: MatricesState,
	operationState: OperationState
}

const rootReducer = combineReducers<AppState>({
	matricesState: dimensionReducer,
	operationState: operationReducer
});
export const store = createStore(rootReducer);
