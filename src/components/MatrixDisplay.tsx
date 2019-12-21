import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import MatrixCell from './MatrixCell';
import Matrix from '../objects/Matrix';
import { changeColumns, changeRows } from '../store/actions/matrixActions';
import { ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';


const theme = createMuiTheme({
	palette: {
		primary: {
			main:'#000000',
		},
	},
});

const StyledTextField = withStyles({
	root: {
		margin: theme.spacing(1),
		width: 200,
	}
})(TextField);

interface MatrixProps {
	matrix: Matrix;
	disabled?: boolean;
}

const MatrixDisplay: React.FC<MatrixProps> = (props: MatrixProps) => {

	let { cols, rows } = props.matrix;
	const dispatch = useDispatch();
	const changeRow = (newVal: number) => dispatch(changeRows(newVal, props.matrix.id));
	const changeCol = (newVal: number) => dispatch(changeColumns(newVal, props.matrix.id));

	const style = {
		width: `${60 / cols}%`,
	};

	function validate(val: number|string, callback: (newVal: number) => {}) {
		if (!isNaN(Number(val))) {
			callback(Number(val));
		}
	}
	if (props.disabled) console.log(props.matrix)

	const display = Array(rows).fill(0).map((row, i) => {
		const rowCells = Array(cols).fill(0).map((cell, j) => {
			return (
				<MatrixCell
					style={style}
					id={props.matrix.id}
					row={i}
					col={j}
					key={props.matrix.id+i+"_"+j}
					disabled={props.disabled ? true : false}
				/>)
		});
		return (
			<div className="row" key={props.matrix.id+i}>
				{rowCells}
			</div>
		);
	});
	const incrementControls = (
			<ThemeProvider theme={theme}>
				<StyledTextField
					variant="outlined"
					size="small"
					label="Rows"
					type="number"
					value={rows}
					onChange={event =>{validate(event.target.value, changeRow)}}
				/>
				<StyledTextField
					variant="outlined"
					size="small"
					label="Columns"
					type="number"
					value={cols}
					onChange={event=>{validate(event.target.value, changeCol)}}
				/>
			</ThemeProvider>
	);
	return (
		<div className={"matrix"}>
			{!props.disabled && incrementControls}
			{display}
		</div>
	);
}

export default MatrixDisplay;
