import React from 'react';
import Document from '../components/Navigation/Document';
import Section from '../components/Navigation/Section';
import { Button } from '@mui/material';
import { NavContext } from '../components/Navigation/NavContext';

const StateDocument = () =>
	<Document patch={ () => {} }>
		<Section name="parentOne" label="ParentOne">
			<NavContext.Consumer>
				{
					(context) => <div>
						<Button
							onClick={ () => {
								context.patch({ button: 'thr' });
							} }
						>hello</Button>
						<div>{ context.state.button }</div>
					</div>
				}
			</NavContext.Consumer>
		</Section>

	</Document>;

export default StateDocument;
