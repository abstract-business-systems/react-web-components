import React, { useEffect } from 'react';
import GlobalContext from '../Document/GlobalContext';
import scaffold from './helper/scaffold.js';

const BuildLoad = ({ currPath, name, label }) => ({
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

const ChildSection = ({
	parentPath = '', name = '', context,
	label = '', children, dynamic,
}) => {
	const currPath = `${ parentPath }${ name }/`;
	const currLocation = getCurrLocation(context, currPath);

	useEffect(() => {
		context.onLoad(BuildLoad({ currPath, name, label, context }));

		return () => {
			dynamic && context.unLoad({ currPath, name });
		};
	}, []);

	return <section className="section">
		{ React.Children.map(children, (child) =>
			(child?.type?.name === 'Section'
				? React.cloneElement(child,
					{ parentPath: currPath })
				: currLocation && child)) }
	</section>;
};

const Section = (props) =>
	<GlobalContext.Consumer>
		{ (context) =>
			<ChildSection { ...{ ...props, context } }/> }
	</GlobalContext.Consumer>;

export default Section;
