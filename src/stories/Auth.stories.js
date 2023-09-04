import React from 'react';
import Auth from '../components/Auth';

const component = {
	title: 'Auth',
	component: Auth,

};

export default component;

const Template = (args) => <Auth { ...args }/>;

export const AuthTemp = Template.bind({});

AuthTemp.args = {
	baseURL: 'http://localhost:30102',
	refreshBefore: { seconds: 5 },
	paths: {},
	onError: () => {},
};
