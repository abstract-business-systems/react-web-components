import Mousetrap from 'mousetrap';

const shortcut = {
	createShortcut: ({ ref, key, cb }) => {
		Mousetrap(ref.current).bind(key, (...args) => {
			cb(...args);

			return false;
		});
	},
};

export default shortcut;
