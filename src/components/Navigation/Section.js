import React from 'react';
import { NavContext } from './NavContext.js';
import scaffold from './helper/scaffold.js';

const setLoad = ({ currPath, name, label, location, context }) => ({
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
	location: location || context.data.location,
});

const Section = ({ children, name, parentPath = '', location, label }) =>
	<NavContext.Consumer>
		{ (context) => {
			const currPath = `${ parentPath }${ name }/`;
			const currLocation = (location || context.data.location)
				.find((data) => data.path === currPath);

			context.onLoad(setLoad({
				currPath, name, label,
				location, context,
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
