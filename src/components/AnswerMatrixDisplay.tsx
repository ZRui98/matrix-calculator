import React from 'react';
import { useSelector } from 'react-redux';
import { AppState  } from '../store';
import MatrixDisplay from './MatrixDisplay';
import Matrix from '../objects/Matrix';

const AnswerMatrixDisplay: React.FC = () => {
	let answerMatrix = useSelector((state: AppState) => state.matricesState.answerMatrix);
	if (!answerMatrix)
		answerMatrix = new Matrix([[]]);
	return (
		<MatrixDisplay
			matrix={answerMatrix}
			disabled={true}
		/>
	);
}

export default AnswerMatrixDisplay;
