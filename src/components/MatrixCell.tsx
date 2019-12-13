import React, {useState} from 'react';
import {simplify} from 'mathjs';

interface MatrixCellProps {
	originalVal?: string;
	style?: React.CSSProperties
}

const MatrixCell: React.FC<MatrixCellProps> = (props) => {
	const [cellValue, setValue] = useState(props.originalVal ? props.originalVal : '0');
	const [isValid, setValid] = useState(true);
	const validate = (cellValue : string) => {
		let val: boolean = true;
		try {
			simplify(cellValue);
		} catch(e) {
			val = false;
		}
		setValid(val);
		setValue(cellValue);
	}

	return (
		<input
			type="text"
			value={cellValue}
			style={props.style}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {validate(e.target.value)}}
			className={isValid ? 'cell valid' : 'cell invalid'}
		/>
	);
}

export default MatrixCell;
