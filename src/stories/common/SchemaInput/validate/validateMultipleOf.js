import { peek } from '@laufire/utils/debug';

const ten = 10;
const decimalLength = 2;

const decimal = (number) => {
	const decimalParts = number.toString().split('.');

	return decimalParts.length === decimalLength
		? decimalParts[1].length
		: 0;
};

const getFractionPoint = (number) =>
	(isNaN(number) ? 0 : decimal(number));

const hasReminder = (multipleOf, curValue) => {
	const testNumDecimals = getFractionPoint(curValue);
	const schemaNumDecimals = getFractionPoint(multipleOf);

	const maxDecimalNum = Math.max(testNumDecimals, schemaNumDecimals);
	const multiplier = Math.pow(ten, maxDecimalNum);

	return Math.round(curValue * multiplier)
		% Math.round(multipleOf * multiplier) !== 0;
};

const isTypeNumber = (multipleOf, curValue) => multipleOf === 0
|| !(typeof curValue === 'number' && isFinite(curValue));

const validateMultipleOf = (multipleOf, curValue) => {
	peek(multipleOf, curValue);
	return isTypeNumber(multipleOf, curValue)
		? false
		: !hasReminder(multipleOf, curValue);
};

export default validateMultipleOf;
