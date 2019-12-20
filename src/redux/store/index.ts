import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {dimensionReducer, MatricesState} from '../reducers/matrixReducers';

export interface AppState {
	matricesState: MatricesState
}

const rootReducer = combineReducers<AppState>({
	matricesState: dimensionReducer
});
export const store = createStore(rootReducer);
