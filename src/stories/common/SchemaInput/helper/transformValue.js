import dayjs from 'dayjs';

const transformValue = {
	date: (value) => dayjs(value).format('YYYY-MM-DD'),
	time: (value) => dayjs(`1/1/2000 ${ value }`).format('hh:mm:ss'),
	number: Number,
	integer: Number,
};

export default transformValue;
