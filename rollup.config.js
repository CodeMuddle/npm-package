// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';


export default {
    // entry: 'compiled/index.js',
    entry: 'compiled/answerme-ext2/gsheet-adapter/reading.js',
    dest: 'dist/index.js',
    format: 'cjs',
    exports: 'named',
    sourceMap: (process.env.NODE_ENV === 'production')? false: 'inline',
    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/styles/**'
            ]
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        (process.env.NODE_ENV === 'production' && uglify())
    ]
};
