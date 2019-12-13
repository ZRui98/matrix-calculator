import React from 'react';
import MatrixCell from './MatrixCell';

interface MatrixProps {
	rows: number;
	columns: number;
}

const Matrix: React.FC<MatrixProps> = (props) => {
	const style = {
		width: `${60 / props.columns}%`,
	};

	const display = Array(props.rows).fill(0).map((row, i) => {
		const rowCells = Array(props.columns).fill(0).map((cell, j) => {
			return (
				<MatrixCell style={style}/>
			)
		});
		return (
			<div className="row">
				{rowCells}
			</div>
		);
	});
	return (
		<div className={"matrix"}>
			{display}
		</div>
	);
}

export default Matrix;
