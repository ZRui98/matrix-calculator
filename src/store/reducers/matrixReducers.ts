import Matrix from '../../objects/Matrix';
import { AnyAction, Reducer } from 'redux';
import { CHANGE_ROWS, CHANGE_COLUMNS, CHANGE_CELL, CALCULATE } from '../actions/matrixActions';
import { CHANGE_OPERATION } from '../actions/operationActions';
import { RREF, MULTIPLY, TRANSPOSE } from '../../util/operations';
import MatrixFunctions from '../../util/matrixFunctions';

export interface MatricesState {
	matrices: Matrix[],
	answerMatrix : Matrix | null
}

const initialState: MatricesState = {
	matrices: [new Matrix(new Array(3).fill('0').map(num => new Array(3).fill('0')))],
	answerMatrix: null
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

const changeMatrices = (newOperation: string, matrices: Matrix[]): Matrix[] => {
	if (newOperation === RREF || newOperation === TRANSPOSE) {
		return [matrices[0]];
	} else {
		let newMatrix: Matrix = new Matrix(new Array(matrices[0].rows)
				.fill('0')
				.map(num => new Array(matrices[0].cols).fill('0')));
		return [matrices[0], newMatrix];
	}
}

const calculateAnswer = (operation: string, matrices: Matrix[]): string[][] | null => {
	switch(operation) {
		case RREF: {
			try{
				return MatrixFunctions.bringToRREF(matrices[0].matrixData);
			} catch{
				console.log('error!');
				return null;
			}
		}
		case MULTIPLY: {
			return MatrixFunctions.multiply(matrices[0].matrixData, matrices[1].matrixData);
		}
		case TRANSPOSE: {
			return MatrixFunctions.transpose(matrices[0].matrixData);
		}
	}
	return null;
}

export const dimensionReducer: Reducer<MatricesState> = (state: MatricesState = initialState, action: AnyAction): MatricesState => {
	let { matrices, answerMatrix } = state;
	switch (action.type) {
		case CHANGE_ROWS: {
			let targetIndex = matrices.findIndex(matrix => matrix.id === action.id);
			matrices = matrices.map((matrix, index) => {
				if (targetIndex === index) {
					return resizeRow(matrix, action.rowChange);
				} else if (targetIndex - 1 === index) {
					return resizeCol(matrix, action.rowChange);	
				} else {
					return matrix;
				}
			});
			break;
		}
		case CHANGE_COLUMNS: {
			let targetIndex = matrices.findIndex(matrix => matrix.id === action.id);
			matrices = matrices.map((matrix, index) => {
				if (targetIndex === index) {
					return resizeCol(matrix, action.columnChange);
				} else if (targetIndex + 1 === index) {
					return resizeRow(matrix, action.columnChange);	
				} else {
					return matrix;
				}
			})
			break;
		}
		case CHANGE_CELL: {
			let targetIndex: number = matrices.findIndex(matrix => matrix.id === action.id);
			matrices[targetIndex] = changeCell(matrices[targetIndex], action);
			break;
		}
		case CHANGE_OPERATION: {
			matrices = changeMatrices(action.newOperation, matrices);
			break;
		}
		case CALCULATE: {
			let answerData: string[][] | null = calculateAnswer(action.operation, matrices);
			answerMatrix = answerData === null ? null : new Matrix(answerData);
			break;
		}
	}
	return {
		matrices,
		answerMatrix
	};
}
