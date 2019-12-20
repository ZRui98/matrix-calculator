export const CHANGE_CELL = 'CHANGE_CELL';
export const CHANGE_ROWS = 'CHANGE_ROWS';
export const CHANGE_COLUMNS = 'CHANGE_COLUMNS';

export interface ChangeCellAction {
	type: typeof CHANGE_CELL,
	id: string,
	row: number,
	col: number
	val: string
}

export const changeCell = (row: number, col: number, val: string, matrixId: string): ChangeCellAction => ({
	type: CHANGE_CELL,
	id: matrixId,
	col: col,
	row: row,
	val: val,
})

interface ChangeRowsAction {
	type: typeof CHANGE_ROWS,
	id: string,
	rowChange: number	
}

interface ChangeColumnsAction {
	type: typeof CHANGE_COLUMNS,
	id: string,
	columnChange: number	
}

type ChangeDimensionsAction = ChangeRowsAction | ChangeColumnsAction;

export const changeColumns = (change: number, matrixId: string): ChangeDimensionsAction => ({
	type: CHANGE_COLUMNS,
	id: matrixId,
	columnChange: change	
})

export const changeRows = (change: number, matrixId: string): ChangeDimensionsAction => ({
	type: CHANGE_ROWS,
	id: matrixId,
	rowChange: change
})
