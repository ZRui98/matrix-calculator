import React, {useState} from 'react';
import {simplify} from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState  } from '../store';
import { changeCell } from '../store/actions/matrixActions';
import Matrix from '../objects/Matrix'

interface MatrixCellProps {
	id: string,
	row: number,
	col: number,
	disabled: boolean,
	style?: React.CSSProperties
}

const MatrixCell: React.FC<MatrixCellProps> = (props: MatrixCellProps) => {
	const [isValid, setValid] = useState(true);
	const value: string = useSelector((state: AppState) => {
		let matrix: Matrix | undefined | null = state.matricesState.matrices.find(matrix => matrix.id === props.id);
		if (!matrix)
			matrix = state.matricesState.answerMatrix;
		if (!matrix) return '0';
		return matrix.matrixData[props.row][props.col];
	});
	const dispatch = useDispatch();
	const changeCellVal = (newVal: string) => dispatch(changeCell(props.row, props.col, newVal, props.id));

	const validate = (cellValue : string) => {
		let val: boolean = true;
		try {
			simplify(cellValue);
		} catch(e) {
			val = false;
		}
		setValid(val);
		changeCellVal(cellValue);
	}

	return (
		<input
			type="text"
			value={value}
			style={props.style}
			disabled={props.disabled}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {validate(e.target.value)}}
			className={isValid ? 'cell valid' : 'cell invalid'}
		/>
	);
}

export default MatrixCell;
