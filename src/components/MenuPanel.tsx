import React, { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { changeOperation } from '../store/actions/operationActions';
import { calculate } from '../store/actions/matrixActions';
import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const StyledToggleButton = withStyles((theme: Theme) => ({
	root: {
		color: '#3F51B5',
		borderColor: '#3F51B5',
		backgroundColor: '#FFFFFF !important'
	},
	selected: {
		color: '#FFFFFF !important',
		backgroundColor: '#3F51B5 !important'
	}
}))(ToggleButton);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			}
	}}));

const MenuPanel: React.FC = () => {

	const dispatch = useDispatch();
	const selectedOperation = useSelector((state: AppState) => state.operationState.operation);

	const onChange = (event: MouseEvent, value: string) => {
		dispatch(changeOperation(value));
	}

	const onClick = (event: MouseEvent) => {
		dispatch(calculate(selectedOperation));
	}

	const options : JSX.Element[] = ['RREF','ADDITION','MULTIPLICATION','TRANSPOSE'].map((opt: string) => {
		const selected: boolean = selectedOperation === opt ? true : false;
		return (
			<StyledToggleButton
				size="small"
				color="primary"
				key={opt}
				value={opt}
				selected={selected}>
			{opt}
			</StyledToggleButton>);
	});

	const style = {
		marginTop: '2%',
		marginBottom: '1%'
	};

	const classes = useStyles();

	return (
		<div className={classes.root} style={style}>
			<ToggleButtonGroup exclusive={true} size="small" onChange={onChange}>
				{options}
			</ToggleButtonGroup>
			<Button color="primary" size="medium" variant="contained" onClick={onClick}>CALCULATE</Button>
		</div>
	);
}

export default MenuPanel;
