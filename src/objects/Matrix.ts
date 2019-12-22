import UUID from 'uuid/v1';

class Matrix {
	matrixData: string[][];
	id: string;
	rows: number;
	cols: number;
	constructor(data: string[][]) {
		this.matrixData = data;
		this.rows = data.length;
		this.cols = data.length > 0 ? data[0].length : 0;
		this.id = UUID();
	}
}

export default Matrix;
