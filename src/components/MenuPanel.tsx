import React from 'react';

const MenuPanel: React.FC = () => {
	const options : JSX.Element[] = ['RREF','ADDITION','MULTIPLICATION','TRANSPOSE'].map((opt: string) => (
		<button key={opt}>{opt}</button>
	));
	return (
		<div>
			{options}
		</div>
	);
}

export default MenuPanel;
