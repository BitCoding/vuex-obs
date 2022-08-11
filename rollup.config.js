import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from "@rollup/plugin-commonjs";
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
// import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named',
            sourcemap: true
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        resolve({ preferBuiltins: false, browser: true }),
        typescript(),
        typescriptPaths({transform:true}),
        commonjs()
    ]
}