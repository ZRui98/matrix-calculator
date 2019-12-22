import React from 'react';
import { FormLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState  } from '../store';
import MatrixDisplay from './MatrixDisplay';
import Matrix from '../objects/Matrix';

const AnswerMatrixDisplay: React.FC = () => {
	let matrixState = useSelector((state: AppState) => ({
		answerMatrix: state.matricesState.answerMatrix,
		hasError: state.matricesState.hasError
	}));
	if (matrixState.hasError) {
		return (<div style={{color:'#FF0000'}}>Error in Input</div>)
	}
	return (
		<div>
			{ matrixState.answerMatrix && <FormLabel style={{display:'block'}}>Answer Matrix</FormLabel> }
			<MatrixDisplay
				matrix={matrixState.answerMatrix ? matrixState.answerMatrix: new Matrix([[]])}
				disabled={true}
			/>
		</div>
	);
}

export default AnswerMatrixDisplay;
