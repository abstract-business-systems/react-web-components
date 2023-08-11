import React, { useEffect } from 'react';
import { NavContext } from './NavContext.js';
import scaffold from './helper/scaffold.js';

const setLoad = ({ currPath, name, label }) => ({
	option: {
		parentPath: currPath,
		options: scaffold(currPath.split('/').map((data) => (data ? `/children/${ data }` : data))
			.join(''),
		{
			children: {},
			name: name,
			label: label || name,
			path: currPath,
		}),
	},
});

// eslint-disable-next-line max-lines-per-function
const ChildSection = ({
	parentPath, name, location,
	context, label, children,
}) => {
	const currPath = `${ parentPath }${ name }/`;
	const currLocation = context.state.location
		.find(({ path }) => path === currPath);

	useEffect(() => {
		context.onLoad(setLoad({
			currPath, name, label,
			location, context,
		}));
	}, []);

	return <section className="section">
		{ React.Children.map(children, (child) =>
			(child.type.name === 'Section'
				? React.cloneElement(child,
					{ parentPath: currPath })
				: currLocation && child)) }
	</section>;
};

const Section = ({ children, name, parentPath = '', location, label }) =>
	<NavContext.Consumer>
		{ (context) =>
			<ChildSection { ...{
				parentPath, name, location,
				context, label, children,
			} }
			/> }
	</NavContext.Consumer>;

export default Section;
