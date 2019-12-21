export const CHANGE_OPERATION = 'CHANGE_OPERATION';
export const CALCULATE = 'CALCULATE';

interface ChangeOperationOperation {
	type: typeof CHANGE_OPERATION,
	newOperation: string	
}

export const changeOperation = (newOperation: string) => ({
	type: CHANGE_OPERATION,
	newOperation: newOperation	
})
