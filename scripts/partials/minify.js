import { terser } from 'rollup-plugin-terser';

import banner from './banner';

export default [
	terser({
		output: {
			preamble: banner,
		},
		compress: {
			drop_console: true,
		},
	}),
];
