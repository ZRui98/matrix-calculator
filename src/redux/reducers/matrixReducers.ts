import Matrix from '../../objects/Matrix';
import { AnyAction, Reducer } from 'redux';
import { CHANGE_ROWS, CHANGE_COLUMNS, CHANGE_CELL } from '../actions/matrixActions';
import { CHANGE_OPERATION } from '../actions/operationActions';

export interface MatricesState {
	matrices: Matrix[]
}

const initialState: MatricesState = {
	matrices: [new Matrix(new Array(3).fill('0').map(num => new Array(3).fill('0')))]
}

const changeCell = (matrix: Matrix, action: AnyAction) => {
	matrix.matrixData[action.row][action.col] = action.val;
	return matrix;
}

const resizeRow = (matrix: Matrix, newSize: number): Matrix => {
	if (newSize < 0) {
		return matrix;
	}
	matrix.rows = newSize;
	const { matrixData } = matrix;
	let deltaRows = newSize - matrixData.length;
	while (deltaRows < 0) {
		deltaRows += 1;
		matrixData.pop();
	}
	while (deltaRows > 0) {
		deltaRows -= 1;
		matrixData.push(new Array(matrix.cols).fill('0'));
	}
	return matrix;
}

const resizeCol = (matrix: Matrix, newSize: number): Matrix => {

	if (newSize >= 0) {
		matrix.cols = newSize;
	}
	if (newSize < 0 || matrix.matrixData.length <= 0) {
		return matrix;
	}
	const { matrixData } = matrix;
	const oldColumns = matrixData[0].length;
    matrixData.forEach((row) => {
      let deltaColumns = newSize - oldColumns;
      while (deltaColumns < 0) {
        deltaColumns += 1;
        row.pop();
      }
      while (deltaColumns > 0) {
        deltaColumns -= 1;
        row.push('0');
      }
	});
	return matrix;
}

export const dimensionReducer: Reducer<MatricesState> = (state: MatricesState = initialState, action: AnyAction): MatricesState => {
	let matrices: Matrix[] = state.matrices;
	switch (action.type) {
		case CHANGE_ROWS: {
			matrices = matrices.map(matrix => matrix.id === action.id ? resizeRow(matrix, action.rowChange) : matrix );
			break;
		}
		case CHANGE_COLUMNS: {
			matrices = matrices.map(matrix => matrix.id === action.id ? resizeCol(matrix, action.columnChange) : matrix )
			break;
		}
		case CHANGE_CELL: {
			// matrices = matrices.map(matrix => matrix.id === action.id ? changeCell(matrix, action) : matrix )
			let targetIndex: number = matrices.findIndex(matrix => matrix.id === action.id);
			matrices[targetIndex] = changeCell(matrices[targetIndex], action);
			break;
		}
		case CHANGE_OPERATION: {
			if (action.newOperation === 'RREF' || action.newOperation === 'TRANSPOSE') {
				if (matrices.length >= 2) {
					matrices = [matrices[0]];
				}
			} else {
				console.log('here');
				if (matrices.length <= 1) {
					let matrix: Matrix = new Matrix(new Array(matrices[0].rows)
													.fill('0')
													.map(num => new Array(matrices[0].cols).fill('0')));
					matrices = [matrices[0], matrix];
				}
			}
		}
	}
	return {
		matrices
	};
}

