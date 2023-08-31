import { merge } from '@laufire/utils/collection';
import { peek } from '@laufire/utils/debug';
import dayjs from 'dayjs';

const httpStatusCodes = { unAuthorized: 401, success: 200 };
const fetchOptions = { method: 'GET', credentials: 'include' };

const redirectToLogin = ({ baseURL, paths: { login }}) =>
	fetch(`${ baseURL }${ login }`, fetchOptions);

const scheduleTokenRenewal = (context) => {
	const { timeDifference, renewToken } = context;

	setTimeout(() => renewToken(context), timeDifference);
};

const fetchSession = async ({ baseURL, paths: { session }}) => {
	const response = await fetch(`${ baseURL }${ session }`, fetchOptions);
	const data = await response.json();

	return { status: response.status, ...data };
};

const calculateRefreshTime = (expiresAt, refreshBefore) =>
	dayjs(expiresAt).subtract(...refreshBefore.split(''));

const statusHandlers = {
	[httpStatusCodes.success]: (context) => {
		const { expiresAt, refreshBefore, renewToken } = context;
		const currentTime = dayjs();
		const refreshTime = calculateRefreshTime(expiresAt, refreshBefore);
		const timeDifference = refreshTime.diff(currentTime);
		const shouldRenewNow = timeDifference <= 0;

		peek({ timeDifference, shouldRenewNow });

		shouldRenewNow
			? renewToken(context)
			: scheduleTokenRenewal({ ...context, timeDifference });
	},
	[httpStatusCodes.unAuthorized]: (context) => {
		const { renewToken } = context;

		peek('401');
		return renewToken(context);
	},
};

const renewToken = async (context) => {
	const { baseURL, paths: { refresh }, refreshSession	} = context;

	peek(context);
	const response = await fetch(`${ baseURL }${ refresh }`, fetchOptions);

	peek(response);

	response.status === httpStatusCodes.unAuthorized
		? redirectToLogin(context)
		: await refreshSession(context);
};

const refreshSession = async (context) => {
	const sessionData = await fetchSession(context);
	const extendedContext = merge(
		{}, context, sessionData, { renewToken }, { refreshSession }
	);

	peek(extendedContext);

	statusHandlers[sessionData.status](extendedContext);
};

export { refreshSession };
