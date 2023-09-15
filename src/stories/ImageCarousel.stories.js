import ImageCarousel from '../components/ImageCarousel';
import Debugger from '../components/Debugger';
import { peek } from '@laufire/utils/debug';

const component = {
	title: 'Display/Image Carousel',
	component: ImageCarousel,
};

export default component;

const Template = Debugger;

export const ImgCarousel = Template.bind({});

ImgCarousel.args = {
	count: 4,
	direction: 'horizontal',
	loop: 'false',
	modules: [],
	watchOverflow: true,
	onAutoPlay: {
		speed: 300,
		followFinger: 'true',
		grabCursor: 'true',
		effect: 'slide',
	},
	spaceBetween: 10,
	slidesPerView: 1,
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 4,
			spaceBetween: 40,
		},
		720: {
			slidesPerView: 5,
			spaceBetween: 50,
		},
		1080: {
			slidesPerView: 6,
			spaceBetween: 60,
		},
	},
	onAny: (eventName, ...args) => {
		peek('Event: ', eventName);
		peek('Event data: ', args);
	},
};
