import React from 'react';
import { useSelector } from 'react-redux';
import MatrixDisplay from './MatrixDisplay';
import { AppState  } from '../store';

const InputMatrices: React.FC = () => {
	const matrices = useSelector((state: AppState) => state.matricesState.matrices);
	const matrixDisplays = matrices.map(matrix => (<MatrixDisplay matrix={matrix} key={matrix.id} />));
	return (
		<div>
			{ matrixDisplays  }
		</div>
	);
}

export default InputMatrices;
