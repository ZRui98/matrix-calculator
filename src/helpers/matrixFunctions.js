import Fraction from 'fraction.js';
import zip from 'lodash/zip';

// Elementary Row Operations
const swapRows = (firstRowIndex, secondRowIndex, matrix) => {
  let matrixCpy = matrix.map(row => row.slice());
  const tempRow = matrix[firstRowIndex].slice(0);
  matrixCpy[firstRowIndex] = matrix[secondRowIndex].slice(0);
  matrixCpy[secondRowIndex] = tempRow;
  matrixCpy = matrixCpy.map(row => row.map(val => val));
  return matrixCpy;
};

const multiplyRow = (row, multiplier) => (
  row.map(val => val.mul(multiplier))
);

const subtractRow = (subtractingRow, targetRow, multiplier = 1) => {
  const multiple = multiplyRow(subtractingRow, multiplier);
  return targetRow.map((val, index) => val.sub(multiple[index]));
};

const addRow = (addingRow, targetRow, multiplier = 1) => {
  const multiple = multiplyRow(addingRow, multiplier);
  return targetRow.map((val, index) => val.add(multiple[index]));
};

const dotProductRow = (row1, row2) => (
  row1.reduce((acc, val, i) => {
    const val2 = row2[i];
    return acc + val.mul([val2.s * val2.n, val2.d]);
  }, 0)
);

const helperFunctions = {
  getFractionData: matrix => (
    matrix.map(row => row.map(val => new Fraction(val)))
  ),

  getStringData: matrix => (
    matrix.map(row => row.map(val => val.toFraction(false)))
  ),

  // bring a matrix to REF.
  bringToREF: (matrix) => {
    let matrixCopy = matrix.map(row => row.slice());
    let currentRow = 0;
    let currentColumn = 0;
    let pivotLocation = { x: currentRow, y: currentColumn };
    /**
     * finds a pivot location by first checking below current column, then checking next
     * column to the right.
     */
    const findPivotLocation = (startingColumn, startingRow, mat) => {
      for (let x = startingColumn; x < mat[0].length; x += 1) {
        for (let y = startingRow; y < mat.length; y += 1) {
          if (mat[y][x].valueOf() !== 0) {
            return { x, y };
          }
        }
      }
      return null;
    };
    // make all entries below pivot zero by performing ERO's
    // ROW = ROW - PIVOT * (multiplier s.t ROW in PIVOT column cancels out).
    const reduceBelowPivot = (row, i) => {
      const index = currentRow + i + 1;
      const multiplier = matrixCopy[index][currentColumn].valueOf();
      if (multiplier === 0) {
        return;
      }
      matrixCopy[index] = subtractRow(matrixCopy[currentRow], matrixCopy[index], multiplier);
    };

    // go through all diagonal positions for possible pivot locations until end is reached
    while (currentRow < matrixCopy.length) {
      pivotLocation = findPivotLocation(currentColumn, currentRow, matrixCopy);
      // exit on no pivot found, as matrix is in row echelon form
      if (!pivotLocation) {
        break;
      }
      // set furthest left pivot to highest row possible, and divide row so pivot is 1
      matrixCopy = swapRows(currentRow, pivotLocation.y, matrixCopy);
      currentColumn = pivotLocation.x;
      const pivot = matrixCopy[currentRow][pivotLocation.x];
      const multiplier = [pivot.s * pivot.d, pivot.n];
      matrixCopy[currentRow] = multiplyRow(matrixCopy[currentRow], multiplier);

      // reduce all values below pivot in column so that they all become zero
      matrixCopy.slice(currentRow + 1).forEach(reduceBelowPivot);

      currentRow += 1;
      currentColumn += 1;
    }
    return matrixCopy;
  },

  // convert a REF matrix to RREF
  bringToRREF: (matrix) => {
    if (matrix === undefined || matrix === null) {
      return null;
    }
    let matrixCopy = matrix.map(row => row.slice());
    matrixCopy = helperFunctions.bringToREF(matrix);
    let currentRow = matrix.length - 1;

    const hasPivot = row => row.findIndex(cell => cell.valueOf() === 1);
    const reduceAbovePivot = pivotLocation => (
      matrixCopy.slice(0, currentRow).forEach((row, index) => {
        if (row[pivotLocation].valueOf() !== 0) {
          const multiplier = matrixCopy[index][pivotLocation].valueOf();
          matrixCopy[index] = subtractRow(matrixCopy[currentRow], matrixCopy[index], multiplier);
        }
      })
    );

    while (currentRow > 0) {
      const pivotLocation = hasPivot(matrixCopy[currentRow]);
      if (pivotLocation !== -1) {
        reduceAbovePivot(pivotLocation);
      }
      currentRow -= 1;
    }
    return matrixCopy;
  },
  add: (firstMatrix, secondMatrix) => (
    firstMatrix.map((row, i) => addRow(row, secondMatrix[i]))
  ),
  transpose: matrix => zip(...matrix),
  multiply: (firstMatrix, secondMatrix) => {
    const firstMatrixCopy = firstMatrix.map(row => row.slice());
    const cols = helperFunctions.transpose(secondMatrix);
    const result = firstMatrixCopy.map(row => cols.map(col => dotProductRow(row, col)));
    return helperFunctions.getFractionData(result);
  },
};

export default helperFunctions;
