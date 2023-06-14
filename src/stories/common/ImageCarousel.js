/* eslint-disable max-lines-per-function */
import { nothing } from '@laufire/utils/fn';
import { React, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import buildEvent from './helper/buildEvent';

const slideStyle = {
	'width': '100vw',
	'height': '100vh',
	'display': 'flex',
	'justify-content': 'center',
	'align-items': 'center',
};
const ImageCarousel = ({ onChange = nothing, count, value: initialValue }) => {
	const [value, setValue] = useState(initialValue);

	return (
		<Swiper { ...{
			...value,
			style: { ...slideStyle },
			onSlideChange: () => {
				setValue(value);
				onChange(buildEvent({ newValue: value }));
			},
		} }
		>{
				Array(count).fill(count)
					.map((slide, index) =>
						<SwiperSlide key={ index }>
							Slide { index }
						</SwiperSlide>)
			}
		</Swiper>
	);
};

export default ImageCarousel;
