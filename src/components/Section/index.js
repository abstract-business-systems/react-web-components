import React, { useEffect, useMemo } from 'react';
import GlobalContext from '../Document/GlobalContext';
import scaffold from './helper/scaffold.js';

const buildAddProp = ({ currPath, name, label }) => ({
	data: {
		parentPath: currPath,
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
	action: 'create',
	entity: 'section',
	id: currPath,
});

const buildDeleteProp = (currPath, name) =>
	({ data: { currPath, name }, action: 'delete', entity: 'section' });

const getCurrLocation = (context, currPath) => context.state.location
	.find(({ value }) => value === currPath);

const Children = ({ children, currLocation }) =>
	React.Children.map(children, (child) => (child?.type?.name === 'Section'
		? child
		: currLocation && child));

const ChildSection = ({
	name = '', context,
	label = '', children, dynamic,
}) => {
	const currPath = `${ context.parentPath }${ name }/`;
	const currLocation = getCurrLocation(context, currPath);

	useEffect(() => {
		context.sendMessage(buildAddProp({ currPath, name, label, context }));

		return () => {
			dynamic && context.sendMessage(buildDeleteProp(currPath, name));
		};
	}, []);

	const contextValue = useMemo(() => ({ ...context, parentPath: currPath }));

	return <GlobalContext.Provider value={ contextValue }>
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
