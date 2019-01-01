import React, { Component } from 'react';
import '../css/App.css';
import debounce from 'lodash/debounce';
import Fraction from 'fraction.js';
import Matrix from '../objects/Matrix';
import Controls from './controls/MainControls';
import MatrixDisplay from './matrix/MatrixDisplay';
import MatrixHelpers from '../helpers/matrixFunctions';
import Operations from '../helpers/operations';

class App extends Component {
  constructor() {
    super();
    this.state = {
      operation: Operations.REDUCE,
      matrices: [],
    };
    const { matrices } = this.state;
    const data = [
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];
    matrices.push(new Matrix(data, {
      type: 'input',
    }));
  }

  getFractionData = matrix => (
    matrix.map(row => row.map(val => new Fraction(val)))
  )

  getResult = debounce((...matrixIDs) => {
    const { operation, matrices } = this.state;
    const matrix = this.findMatrix(matrixIDs[0]);
    const handleMatrixData = (m) => {
      const mat = m;
      try {
        mat.invalid = false;
        this.changeMatrix(mat, mat.id);
        return MatrixHelpers.getFractionData(mat.data);
      } catch (e) {
        mat.invalid = true;
        this.changeMatrix(mat, mat.id);
        return null;
      }
    };
    const fractionDatas = [];
    let hasInvalids;
    matrixIDs.forEach((mat) => {
      const fractionData = handleMatrixData(this.findMatrix(mat));
      if (!fractionData) {
        hasInvalids = true;
      }
      fractionDatas.push(fractionData);
    });
    if (hasInvalids) {
      return;
    }
    const resultMatrixIndex = matrices.findIndex(mat => mat.type === 'result');
    let newMatrixData;

    if (operation === Operations.REDUCE) {
      this.changeMatrix(matrix, matrix.id);
      const reducedMatrix = MatrixHelpers.bringToRREF(fractionDatas[0]);
      newMatrixData = MatrixHelpers.getStringData(reducedMatrix);
    } else if (operation === Operations.ADD) {
      const addedMatrixData = MatrixHelpers.add(fractionDatas[0], fractionDatas[1]);
      newMatrixData = MatrixHelpers.getStringData(addedMatrixData);
    } else if (operation === Operations.MULTIPLY) {
      const multipliedMatrixData = MatrixHelpers.multiply(fractionDatas[0], fractionDatas[1]);
      newMatrixData = MatrixHelpers.getStringData(multipliedMatrixData);
    } else if (operation === Operations.TRANSPOSE) {
      const addedMatrixData = MatrixHelpers.transpose(fractionDatas[0]);
      newMatrixData = MatrixHelpers.getStringData(addedMatrixData);
    }
    const newMatrix = new Matrix(newMatrixData, { type: 'result' });
    if (resultMatrixIndex === -1) {
      this.addMatrix(newMatrix);
      return;
    }
    const oldID = matrices[resultMatrixIndex].id;
    this.changeMatrix(oldID, newMatrix);
  }, 500);

  findMatrix = (matrixID) => {
    const { matrices } = this.state;
    return matrices.find(matrix => matrix.id === matrixID);
  };

  findMatrixIndex = (matrixID) => {
    const { matrices } = this.state;
    return matrices.findIndex(matrix => matrix.id === matrixID);
  };

  removeResultMatrix = () => {
    const { matrices } = this.state;
    const index = matrices.findIndex(matrix => matrix.type === 'result');
    if (index === -1) {
      return;
    }
    matrices.pop(index);
    this.setState({ matrices });
  }

  createMatrixData = (rows, columns) => Array(rows).fill().map(() => Array(columns).fill('0'));

  changeColumns = (newColumns, matrixID) => {
    if (newColumns < 0) {
      return;
    }
    const matrix = this.findMatrix(matrixID);
    const { columns: oldColumns, data: matrixData } = matrix;
    matrixData.forEach((row) => {
      let deltaColumns = newColumns - oldColumns;
      while (deltaColumns < 0) {
        deltaColumns += 1;
        row.pop();
      }
      while (deltaColumns > 0) {
        deltaColumns -= 1;
        row.push('0');
      }
    });
    matrix.columns = parseInt(newColumns, 10) || 0;
    matrix.data = matrixData;
    this.changeMatrix(matrixID, matrix);
    this.removeResultMatrix();
  }

  changeRows = (newRows, matrixID) => {
    if (newRows < 0) {
      return;
    }
    const matrix = this.findMatrix(matrixID);
    const { rows: oldRows, columns, data: matrixData } = matrix;
    let deltaRows = newRows - oldRows;

    while (deltaRows < 0) {
      deltaRows += 1;
      matrixData.pop();
    }
    while (deltaRows > 0) {
      deltaRows -= 1;
      matrixData.push(new Array(parseInt(columns, 10)).fill('0'));
    }
    matrix.rows = parseInt(newRows, 10) || 0;
    matrix.data = matrixData;
    this.changeMatrix(matrixID, matrix);
    this.removeResultMatrix();
  }

  changeMatrix = (matrixID, matrix) => {
    const { matrices } = this.state;
    const matrixIndex = this.findMatrixIndex(matrixID);
    if (matrixIndex >= matrices.length) {
      throw new Error('Invalid matrixIndex');
    }
    matrices[matrixIndex] = matrix;
    this.setState({ matrices });
  }

  addMatrix = (matrix) => {
    const { matrices } = this.state;
    matrices.push(matrix);
    this.setState({ matrices });
  }

  setCellInvalid = (matrixID, invalid) => {
    const matrix = this.findMatrix(matrixID);
    matrix.invalid = invalid;
    this.changeMatrix(matrixID, matrix);
  }

  changeCell = (newValue, row, column, matrixID) => {
    // regex for checking that number is vaid fraction, trails with a single '/', or is a single -
    const matrix = this.findMatrix(matrixID);
    matrix.data[row][column] = newValue.toString();
    this.changeMatrix(matrixID, matrix);
    const { operation } = this.state;
    if (operation === Operations.REDUCE) {
      this.getResult(matrixID);
      return;
    }
    const { matrices } = this.state;
    const filtered = matrices.filter(m => m.type === 'input').map(m => m.id);
    this.getResult(...filtered);
  }


  changeOperation = (operation) => {
    const matrices = [];
    if (operation === Operations.REDUCE || operation === Operations.TRANSPOSE) {
      matrices.push(new Matrix(this.createMatrixData(3, 3), {
        type: 'input',
      }));
    } else if (operation === Operations.ADD || operation === Operations.MULTIPLY) {
      matrices.push(new Matrix(this.createMatrixData(3, 3), {
        type: 'input',
      }));
      matrices.push(new Matrix(this.createMatrixData(3, 3), {
        type: 'input',
      }));
    }
    this.setState({ operation, matrices });
  }

  render() {
    const {
      operation,
      operations,
      matrices,
    } = this.state;
    const matrixDisplays = matrices.filter(matrix => matrix.type !== 'result').map(matrix => (
      <div className="matrix" key={`matrix${matrix.id}`}>
        <MatrixDisplay
          key={`display${matrix.id}`}
          matrix={matrix}
          changeCell={this.changeCell}
        />
      </div>
    ));
    const resultMatrix = matrices.find(matrix => matrix.type === 'result');
    const resultDisplay = resultMatrix && resultMatrix.data && resultMatrix.data.length > 0
      && resultMatrix.data[0].length > 0 ? (
        <div className="resultMatrix">
          <div>RESULT</div>
          <MatrixDisplay
            key={resultMatrix.id}
            matrix={resultMatrix}
            changeCell={this.changeCell}
          />
        </div>
      ) : '';
    return (
      <div>
        <Controls
          matrices={matrices}
          operation={operation}
          operations={operations}
          changeRows={this.changeRows}
          changeColumns={this.changeColumns}
          changeOperation={this.changeOperation}
        />
        <div className="matrices">
          {matrixDisplays}
        </div>
        {resultDisplay}
      </div>
    );
  }
}

export default App;
