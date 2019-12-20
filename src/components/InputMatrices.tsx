import React from 'react';
import MatrixDisplay from './MatrixDisplay';
import { AppState  } from '../redux/store';
import { useSelector } from 'react-redux';

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
