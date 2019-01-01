import '../../css/Controls.css';
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../helpers/customPropTypes';
import Operations from '../../helpers/operations';
import MultipleMatrixControls from './MultipleMatrixControls';
import SingleMatrixControls from './SingleMatrixControls';
import DependantMatrixControls from './DependantMatrixControls';
import OperationControls from './OperationControls';

const mainControls = ({
  operation,
  changeOperation,
  changeRows,
  changeColumns,
  matrices,
}) => {
  let matrixControls = '';
  if (operation === Operations.REDUCE || operation === Operations.TRANSPOSE) {
    matrixControls = (
      <SingleMatrixControls
        changeRows={changeRows}
        changeColumns={changeColumns}
        matrix={matrices.find(matrix => matrix.type === 'input')}
      />
    );
  } else if (operation === Operations.ADD) {
    matrixControls = (
      <MultipleMatrixControls
        changeRows={changeRows}
        changeColumns={changeColumns}
        matrices={matrices}
      />
    );
  } else if (operation === Operations.MULTIPLY) {
    matrixControls = (
      <DependantMatrixControls
        changeRows={changeRows}
        changeColumns={changeColumns}
        matrices={matrices}
      />
    );
  }
  return (
    <div className="controls">
      <OperationControls changeOperation={changeOperation} />
      {matrixControls}
    </div>
  );
};

mainControls.propTypes = {
  operation: PropTypes.string.isRequired,
  changeRows: PropTypes.func.isRequired,
  changeColumns: PropTypes.func.isRequired,
  changeOperation: PropTypes.func.isRequired,
  matrices: PropTypes.arrayOf(CustomPropTypes.Matrix).isRequired,
};

export default mainControls;
