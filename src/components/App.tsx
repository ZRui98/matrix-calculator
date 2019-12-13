import React from 'react';
import '../css/App.css';
import '../css/Matrix.css';
import Matrix from './Matrix';
import MenuPanel from './MenuPanel';

const App: React.FC = () => {
	return (
		<div className="App">
			<MenuPanel />
			<Matrix rows={5} columns={5} />
		</div>
	);
}

export default App;
