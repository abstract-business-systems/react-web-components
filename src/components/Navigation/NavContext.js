import { createContext } from 'react';

export const NavContext = createContext({
	value: 0,
	path: '',
	pathname: '',
	options: {},
	location: [],
});
