import React, {useState} from 'react';
import {simplify} from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState  } from '../redux/store';
import { changeCell } from '../redux/actions/matrixActions';
import Matrix from '../objects/Matrix'

interface MatrixCellProps {
	id: string,
	row: number,
	col: number,
	style?: React.CSSProperties
}

const MatrixCell: React.FC<MatrixCellProps> = (props) => {
	const [isValid, setValid] = useState(true);
	const value: string = useSelector((state: AppState) => {
		const matrix: Matrix | undefined = state.matricesState.matrices.find(matrix => matrix.id === props.id);
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
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {validate(e.target.value)}}
			className={isValid ? 'cell valid' : 'cell invalid'}
		/>
	);
}

export default MatrixCell;
