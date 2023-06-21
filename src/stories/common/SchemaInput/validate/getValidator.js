import addFormats from 'ajv-formats';
import validateMultipleOf from './validateMultipleOf';
import Ajv from 'ajv';

const getAjv = (() => {
	const ajv = new Ajv();

	const phoneNoPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

	ajv.removeKeyword('multipleOf');

	ajv.addKeyword({
		keyword: 'multipleOf',
		type: 'number',
		validate: validateMultipleOf,
	});

	ajv.addFormat('phoneNo', {
		validate: (phoneNumber) =>
			phoneNoPattern.test(phoneNumber),
	});

	addFormats(ajv);

	return ajv;
})();

const getValidator = (schema) => getAjv.compile(schema);

export default getValidator;
