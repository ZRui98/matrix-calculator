import React from 'react';
import { useDispatch } from 'react-redux';
import MatrixCell from './MatrixCell';
import IncrementControl from './IncrementControl';
import Matrix from '../objects/Matrix';
import { changeColumns, changeRows } from '../redux/actions/actions';

interface MatrixProps {
	matrix: Matrix;
}

const MatrixDisplay: React.FC<MatrixProps> = (props: MatrixProps) => {

	let { cols, rows } = props.matrix;
	const dispatch = useDispatch();
	const changeRow = (newVal: number) => dispatch(changeRows(newVal, props.matrix.id));
	const changeCol = (newVal: number) => dispatch(changeColumns(newVal, props.matrix.id));

	const style = {
		width: `${60 / cols}%`,
	};

	const display = Array(rows).fill(0).map((row, i) => {
		const rowCells = Array(cols).fill(0).map((cell, j) => {
			return (
				<MatrixCell
					style={style}
					id={props.matrix.id}
					row={i}
					col={j}
					key={props.matrix.id+i+"_"+j}
				/>)
		});
		return (
			<div className="row" key={props.matrix.id+i}>
				{rowCells}
			</div>
		);
	});

	return (
		<div className={"matrix"}>
			<IncrementControl val={cols} changeVal={changeCol}/>
			<IncrementControl val={rows} changeVal={changeRow}/>
			{display}
		</div>
	);
}

export default MatrixDisplay;
