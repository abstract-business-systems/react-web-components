import React from 'react';
import DeviceComponent from './common/Device';
import { peek } from '@laufire/utils/debug';

const component = {
	title: 'Display/Device',
	component: DeviceComponent,
};

export default component;

const Template = (args) => <DeviceComponent { ...args }/>;

export const Device = Template.bind({});

DeviceComponent.args = { onChange: peek };
