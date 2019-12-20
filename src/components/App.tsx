import React from 'react';
import '../css/App.css';
import '../css/Matrix.css';
import MenuPanel from './MenuPanel';
import InputMatrices from './InputMatrices';

const App: React.FC = () => {
	return (
		<div className="App">
			<MenuPanel />
			<InputMatrices />
		</div>
	);
}
export default App;
