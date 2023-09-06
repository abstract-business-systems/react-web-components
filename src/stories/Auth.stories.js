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
	refreshBefore: '1s22d2w3M1m',
	paths: {},
	onError: () => {},
};
