import React, { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/store';
import { changeOperation } from '../redux/actions/operationActions';
import { withStyles } from '@material-ui/core/styles';

const StyledToggleButton = withStyles(theme => ({
	root: {
		color: '#000000',
		borderColor: '#000000',
	},
	selected: {
		color: '#000000!important',
	}
}))(ToggleButton);
const MenuPanel: React.FC = () => {

	const dispatch = useDispatch();
	const selectedOperation = useSelector((state: AppState) => state.operationState.operation);
	const onChange = (event: MouseEvent, value: string) => {
		dispatch(changeOperation(value));
	}
	const options : JSX.Element[] = ['RREF','ADDITION','MULTIPLICATION','TRANSPOSE'].map((opt: string) => {
		const selected: boolean = selectedOperation === opt ? true : false;
		return (<StyledToggleButton color="secondary" key={opt} value={opt} selected={selected}>{opt}</StyledToggleButton>);
	});

	return (
		<div>
			<ToggleButtonGroup exclusive={true} onChange={onChange}>
				{options}
			</ToggleButtonGroup>
		</div>
	);
}

export default MenuPanel;
