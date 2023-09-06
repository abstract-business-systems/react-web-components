import genWithContext from './genWithContext';
import DisplayComponent from './Display';
import ButtonComponent from './Button';

const Display = genWithContext({ Component: DisplayComponent });
const Button = genWithContext({ Component: ButtonComponent });

export { Display, Button };
