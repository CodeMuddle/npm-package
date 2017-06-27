// Rollup plugins
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

// import commonjs from 'rollup-plugin-commonjs';
export default {
	entry: 'compiled/ES6/index.js',
	dest: 'dist/index.js',
	format: 'cjs',
	exports: 'named',
	sourceMap: process.env.NODE_ENV === 'production' ? false : 'inline',
	external: ['fs', 'googleapis', 'readline'],
	plugins: [
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
		process.env.NODE_ENV !== 'production' && sourcemaps(),
		resolve({
			jsnext: true,
			main: true,
		}),
		// commonjs(),
		eslint({
			exclude: ['compiled/**'],
		}),
		babel({
			exclude: 'node_modules/**',
		}),
		process.env.NODE_ENV === 'production' && uglify(),
	],
};
