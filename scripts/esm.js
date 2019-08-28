import output from './partials/output';
import input from './partials/input';

export default {
	input,
	output: Object.assign(output, {
		file: 'lib/tweento.esm.js',
		format: 'esm',
	}),
};
