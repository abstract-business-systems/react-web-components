/* eslint-disable max-lines-per-function */
import React from 'react';
import { NavContext } from './NavContext.js';
import scaffold from './helper/scaffold.js';

const Section = ({ children, name, parentPath = '', label }) => {
	const currPath = `${ parentPath }${ name }/`;
	// const currLocation = location
	// 	|| level.location.find((data) => data.path === path);

	// const navigate = useNavigate();

	return (
		<NavContext.Consumer>
			{ (context) => {
				context.onLoad({
					parentPath: currPath,
					options: scaffold(currPath.split('/').map((data) =>
						(data ? `/children/${ data }` : data))
						.join(''),
					{
						children: {},
						name: name,
						label: label || name,
						path: currPath,
					}),
				});

				return <section className="section">
					{ React.Children.map(children, (child) =>
						(child.type.name === 'Section'
							? React.cloneElement(child,
								{ parentPath: currPath })
							: child)) }
					{ /*
				{ React.Children.map(children, (child) =>
					(child.type.name === 'Section'
						? React.cloneElement(child)
						: currLocation && child)) }
				<a onClick={ () => { navigate(`${ level.path }${ name }/`); } }>
					{ `${ level.path }${ name }/` }
				</a>
			*/ }
				</section>;
			} }
		</NavContext.Consumer>
	);
};

export default Section;
