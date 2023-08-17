import React, { useEffect, useMemo } from 'react';
import GlobalContext from '../Document/GlobalContext';
import scaffold from './helper/scaffold.js';

const buildLoad = ({ currPath, name, label }) => ({
	option: {
		parentPath: currPath,
		sections: scaffold(currPath.split('/').map((data) =>
			(data ? `/children/${ data }` : data))
			.join(''),
		{
			children: {},
			name: name,
			label: label || name,
			path: currPath,
		}),
	},
});

const getCurrLocation = (context, currPath) => context.state.location
	.find(({ path }) => path === currPath);

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
		context.onLoad(buildLoad({ currPath, name, label, context }));

		return () => {
			dynamic && context.unLoad({ currPath, name });
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
