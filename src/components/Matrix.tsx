import React, {useState} from 'react';
import MatrixCell from './MatrixCell';
import IncrementControl from './IncrementControl'

interface MatrixProps {
	rows?: number;
	columns?: number;
}

const Matrix: React.FC<MatrixProps> = (props) => {
	const [columns, setColumns] = useState(props.columns ? props.columns : 1);
	const [rows, setRows] = useState(props.rows ? props.rows : 1);

	const style = {
		width: `${60 / columns}%`,
	};

	const display = Array(rows).fill(0).map((row, i) => {
		const rowCells = Array(columns).fill(0).map((cell, j) => {
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
			<IncrementControl val={columns} changeVal={setColumns}/>
			<IncrementControl val={rows} changeVal={setRows}/>
			{display}
		</div>
	);
}

export default Matrix;
