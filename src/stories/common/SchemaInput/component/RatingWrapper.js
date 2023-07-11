import React from 'react';
import Rating from '../../Rating';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const RatingWrapper = ({ value, onChange = nothing, schema: { maximum }}) =>
	<Rating { ...{
		value: value,
		max: maximum,
		onChange: (evt) =>
			onChange(buildEvent({ value: evt.target.value })),
	} }
	/>;

export default RatingWrapper;
