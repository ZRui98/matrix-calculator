import React from 'react';

interface IncrementProps {
	val: number;
	changeVal: (value: number) => void;
}

const IncrementControl: React.FC<IncrementProps> = ({val, changeVal}) => {
	const validate = (val: string) => {
		if (!isNaN(Number(val))) {
			changeVal(Number(val))
		}
	}
	return (
		<div className="dimensionControls">
		  <input type="button" onClick={() => changeVal(val - 1)} value="-1" />
		  <input
			className="dimensionInput"
			type="number"
			value={val}
			onChange={event => validate(event.target.value)}
		  />
		  <input type="button" onClick={() => changeVal(val + 1)} value="+1" />
		</div>
	)
}

export default IncrementControl;
