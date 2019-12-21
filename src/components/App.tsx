import React from 'react';
import '../css/App.css';
import '../css/Matrix.css';
import MenuPanel from './MenuPanel';
import InputMatrices from './InputMatrices';
import AnswerMatrixDisplay from './AnswerMatrixDisplay';

const App: React.FC = () => {
	return (
		<div className="App">
			<MenuPanel />
			<InputMatrices />
			<AnswerMatrixDisplay />
		</div>
	);
}
export default App;
