import { merge } from '@laufire/utils/collection';
import { defined } from '@laufire/utils/fn';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const httpStatusCodes = { unAuthorized: 401, success: 200 };
const fetchOptions = { method: 'GET', credentials: 'include' };
const durationOptions = {
	seconds: 0,
	minutes: 0,
	hours: 0,
	days: 0,
	weeks: 0,
	months: 0,
	years: 0,
};

const redirectToLogin = ({ baseURL, paths: { login }}) =>
	fetch(`${ baseURL }${ login }`, fetchOptions);

const scheduleTokenRenewal = (context) => {
	const { refreshIn, renewToken } = context;

	setTimeout(() => renewToken(context), refreshIn);
};

const fetchSession = async ({ baseURL, paths: { session }}) => {
	const response = await fetch(`${ baseURL }${ session }`, fetchOptions);
	const data = await response.json();
	const { status } = response;

	return { status, data };
};

const getRefreshIn = (expiresAt, refreshBefore) => {
	const currentTime = dayjs();
	const newLocal = merge(durationOptions, refreshBefore);
	const refreshTime = dayjs(expiresAt).subtract(dayjs.duration(newLocal));
	const timeDifference = refreshTime.diff(currentTime);

	return timeDifference;
};

const statusHandlers = {
	[httpStatusCodes.success]: (context) => {
		const {
			session: { data: { expiresAt }},
			refreshBefore,
			renewToken,
		} = context;

		const refreshIn = getRefreshIn(expiresAt, refreshBefore);
		const shouldRenewNow = refreshIn <= 0;

		shouldRenewNow
			? renewToken(context)
			: scheduleTokenRenewal({ ...context, refreshIn });
	},
	[httpStatusCodes.unAuthorized]: (context) => {
		const { renewToken } = context;

		return renewToken(context);
	},
};

const defaultStatusCode = () => ({ error: { code: 'Unknown error' }});

const renewToken = async (context) => {
	const {
		baseURL,
		paths: { refresh },
		refreshSession,
	} = context;

	const response = await fetch(`${ baseURL }${ refresh }`, fetchOptions);
	const executeWithContext = (fn) => fn(context);

	response.status === httpStatusCodes.unAuthorized
		? executeWithContext(redirectToLogin)
		: executeWithContext(refreshSession);
};

const refreshSession = async (context) => {
	const session = await fetchSession(context);
	const extendedContext = merge({ renewToken, refreshSession, session },
		context);
	const handleStatus = defined(statusHandlers[session.status],
		defaultStatusCode);

	handleStatus(extendedContext);
};

export { refreshSession };
