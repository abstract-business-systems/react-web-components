import React, { useEffect } from 'react';
import GlobalContext from '../Document/GlobalContext';
import scaffold from './helper/scaffold.js';

const buildAddProp = ({ currPath, name, label }) => ({
	data: {
		structurePath: currPath,
		sections: scaffold(currPath.split('/').map((data) =>
			(data ? `/children/${ data }` : data))
			.join(''),
		{
			children: {},
			name: name,
			label: label || name,
			value: currPath,
		}),
	},
	action: 'addSection',
	entity: 'section',
	path: currPath,
});

const buildDeleteProp = (currPath, name) =>
	({ data: { currPath, name }, action: 'removeSection', entity: 'section' });

const getCurrLocation = (context, currPath) => context.state.location
	.find(({ value }) => value === currPath);

const Children = ({ children, currLocation }) =>
	React.Children.map(children, (child) => (child?.type?.name === 'Section'
		? child
		: currLocation && child));

const contextValue = (context, currPath) => ({
	...context,
	structurePath: currPath,
});

const ChildSection = ({
	name = '', label = '',
	context, children, dynamic,
}) => {
	const currPath = `${ context.structurePath }${ name }/`;
	const currLocation = getCurrLocation(context, currPath);

	useEffect(() => {
		context.sendMessage(buildAddProp({ currPath, name, label, context }));

		return () => {
			dynamic && context.sendMessage(buildDeleteProp(currPath, name));
		};
	}, []);

	return <GlobalContext.Provider value={ contextValue(context, currPath) }>
		<section className="section">
			<Children { ...{ children, currLocation } }/>
		</section>
	</GlobalContext.Provider>;
};

const Section = (props) =>
	<GlobalContext.Consumer>
		{ (context) =>
			<ChildSection { ...{ ...props, context } }/> }
	</GlobalContext.Consumer>;

export default Section;
