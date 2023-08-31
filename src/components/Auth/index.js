import { useEffect } from 'react';
import { refreshSession } from './service';
import { merge } from '@laufire/utils/collection';

const defaultPaths = {
	session: '/auth/session',
	refresh: '/auth/refresh',
	login: '/auth/login/google',
};

const Auth = (props) => {
	const { paths: propPaths } = props;
	const paths = merge(
		{}, defaultPaths, propPaths
	);

	useEffect(() => {
		refreshSession({ ...props, paths });
	}, []);

	return null;
};

export default Auth;
