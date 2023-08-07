import React from 'react';
import { NavContext } from './NavContext.js';
import scaffold from './helper/scaffold.js';

const setLoad = ({ currPath, name, label, locations, context }) => ({
	parentPath: currPath,
	options: scaffold(currPath.split('/').map((data) => (data ? `/children/${ data }` : data))
		.join(''),
	{
		children: {},
		name: name,
		label: label || name,
		path: currPath,
	}),
	locations: locations || context.data.locations,
});

const Section = ({ children, name, parentPath = '', locations, label }) =>
	<NavContext.Consumer>
		{ (context) => {
			const currPath = `${ parentPath }${ name }/`;
			const currLocation = (locations || context.data.locations)
				.find((data) => data.path === currPath);

			context.onLoad(setLoad({
				currPath, name, label,
				locations, context,
			}));

			return <section className="section">
				{ React.Children.map(children, (child) =>
					(child.type.name === 'Section'
						? React.cloneElement(child,
							{ parentPath: currPath })
						: currLocation && child)) }
			</section>;
		} }
	</NavContext.Consumer>;

export default Section;
