import React from 'react';
import '../../css/Matrix.css';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../helpers/customPropTypes';
import MatrixCell from './MatrixCell';

const matrixDisplay = ({
  matrix,
  changeCell,
}) => {
  const style = {
    width: `${60 / matrix.columns}%`,
  };

  const messages = [];
  const { invalid } = matrix;
  if (invalid) {
    messages.push(
      <div key="invalid">Matrix is invalid!</div>,
    );
  }

  const display = matrix.data.map((row, i) => {
    const uniqueRowID = i * matrix.id;
    const rowCells = row.map((cell, j) => {
      const uniqueCellID = i * matrix.columns + j * matrix.id;
      const readOnly = matrix.type === 'result';
      return (
        <MatrixCell
          readOnly={readOnly}
          className="cell"
          style={style}
          type="text"
          cellValue={cell}
          changeCell={(value) => { changeCell(value, i, j, matrix.id); }}
          key={uniqueCellID}
        />
      );
    });
    return (
      <div className="row" key={uniqueRowID}>
        {rowCells}
      </div>
    );
  });
  return (
    <div className="matrixDisplay">
      <div className="messages">
        {messages}
      </div>
      {display}
    </div>
  );
};

matrixDisplay.propTypes = {
  matrix: CustomPropTypes.Matrix.isRequired,
  changeCell: PropTypes.func.isRequired,
};


export default matrixDisplay;
