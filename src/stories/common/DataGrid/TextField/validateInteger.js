import Ajv from 'ajv';

const validateInteger = (schema, value) => {
	const ajv = new Ajv();
	const validate = ajv.compile(schema);

	const valid = validate(value);

	return valid;
};

export default validateInteger;