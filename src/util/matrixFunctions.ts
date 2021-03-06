import { simplify } from 'mathjs';


const rules = [
	{l:'n/n', r:'1'},
	{l:'n*(1/n)', r:'1'},
    {l:'n1*n3/n2-n1/n2*n3',r: '0'},
	{l:'(n1/n2)*(n3/n4)', r:'(n1*n3)/(n2*n4)'},
	{l:'n2/(n2*n1)', r:'1/n1'},
	{l:'n3*n2/(n2*n1)', r:'n3/n1'},
	{l: 'n1*(n2+n3)', r: 'n1*n2+n1*n3'},
	{l: 'n1*n2+n1*n3', r: 'n1*(n2+n3)'},
	{l: 'n1*(n2-n3)', r: 'n1*n2-n1*n3'},
	{l: 'n1*n2-n1*n3', r: 'n1*(n2-n3)'},
	{l:'(n1*n2)/(n1*n2)', r:'1'}
];

const doubleSimplify = (expression: string) => simplify(simplify(simplify(expression,rules)),rules);

const swapRows = (firstRowIndex : number, secondRowIndex : number, matrix : string[][]) : string[][] => {
	let matrixCpy : string[][] = matrix.map(row => row.slice());
	const tempRow = matrix[firstRowIndex].slice(0);
	matrixCpy[firstRowIndex] = matrix[secondRowIndex].slice(0);
	matrixCpy[secondRowIndex] = tempRow;
	matrixCpy = matrixCpy.map(row => row.map(val => val));
	return matrixCpy;
}

const multiplyRow = (row : string[], multiplier : string): string[] => {
	multiplier = doubleSimplify(multiplier).toString();
	return row.map((val: string) => doubleSimplify(multiplier + ' * (' + val + ')').toString());
};

const divideRow = (row: string[], divisor: string): string[] => {
	divisor = doubleSimplify(divisor).toString();
	return row.map((val: string) => doubleSimplify('(' + val + ') / (' + divisor + ')').toString());
}

const subtractRowM = (subtractingRow : string[], targetRow : string[], multiplier: string = '1'): string[] => {
	const multiple = multiplier === '1' ? subtractingRow : multiplyRow(subtractingRow, multiplier);
	return targetRow.map((val : string, index : number) => 
					doubleSimplify('(' + val + ') - (' +  multiple[index] + ')').toString());
};

const addRow = (addingRow : string[], targetRow : string[], multiplier = '1') => {
	const multiple = multiplyRow(addingRow, multiplier);
	return targetRow.map((val, index) => doubleSimplify('(' + val + ') + (' +  multiple[index] + ')').toString());
};

const dotProductRow = (row1 : string[], row2 : string[]) => {
	return doubleSimplify(row1.reduce((acc, val, i) => {
		const val2 = row2[i];
		return acc + val + '*' + val2 + '+';
	}, '').slice(0,-1)).toString()
};

const helperFunctions = {
  // bring a matrix to REF.
  bringToREF: (matrix: string[][]) => {
    let matrixCopy = matrix.map(row => row.slice());
    let currentRow = 0;
    let currentColumn = 0;
    let pivotLocation : ( {x : number, y : number} | null )= { x: currentRow, y: currentColumn };
    /**
     * finds a pivot location by first checking below current column, then checking next
     * column to the right.
     */
    const findPivotLocation = (startingColumn : number, startingRow : number, mat : string[][]) => {
      for (let x = startingColumn; x < mat[0].length; x += 1) {
        for (let y = startingRow; y < mat.length; y += 1) {
          if (mat[y][x].valueOf() !== '0') {
            return { x, y };
          }
        }
      }
      return null;
    };
    // make all entries below pivot zero by performing ERO's
    // ROW = ROW - PIVOT * (multiplier s.t ROW in PIVOT column cancels out).
	const reduceBelowPivot = (row : string[], i : number) => {
		const index = currentRow + i + 1;
		const multiplier = matrixCopy[index][currentColumn];
		if (multiplier === '0') {
			return;
		}
		matrixCopy[index] = subtractRowM(matrixCopy[currentRow], matrixCopy[index], multiplier);
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
		const pivot = matrixCopy[currentRow][currentColumn];
		const divider = pivot;
		matrixCopy[currentRow] = divideRow(matrixCopy[currentRow], divider);

		// reduce all values below pivot in column so that they all become zero
		matrixCopy.slice(currentRow + 1).forEach(reduceBelowPivot);
		currentRow += 1;
		currentColumn += 1;
	}

    return matrixCopy;
  },

  // convert a REF matrix to RREF
  bringToRREF: (matrix: string[][]): string[][] => {
    if (matrix === undefined || matrix === null) {
      return [[]];
    }
    let matrixCopy : string[][] = matrix.map(row => row.slice());
	matrixCopy = helperFunctions.bringToREF(matrix);
    let currentRow : number = matrix.length - 1;

    const hasPivot = (row : string[]) => row.findIndex(cell => cell.valueOf() === '1');
    const reduceAbovePivot = (pivotIndex : number) => (
      matrixCopy.slice(0, currentRow).forEach((row, index) => {
        if (row[pivotIndex] !== '0') {
          const multiplier = matrixCopy[index][pivotIndex].valueOf();
          matrixCopy[index] = subtractRowM(matrixCopy[currentRow], matrixCopy[index], multiplier);
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

  add: (firstMatrix : string[][], secondMatrix : string[][]) => (
    firstMatrix.map((row, i) => addRow(row, secondMatrix[i]))
  ),

  transpose: (matrix : string[][]) => matrix[0].map((col, i) => matrix.map(row => row[i])),

  multiply: (firstMatrix : string[][], secondMatrix : string[][]): string[][] => {
    const firstMatrixCopy = firstMatrix.map(row => row.slice());
    const cols = helperFunctions.transpose(secondMatrix);
    const result = firstMatrixCopy.map(row => cols.map(col => dotProductRow(row, col)));
    return result;
  },
};

export default helperFunctions;
