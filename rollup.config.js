import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
// import {terser} from "rollup-plugin-terser";

const pkg = require('./package.json');

export default {
    input: 'src/index.ts',
    output: [
        { file: pkg.main, name: 'phaser', format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true },
        { file: pkg.browser, name: 'Phaser', format: 'iife', sourcemap: true }
    ],
    watch: {
        include: 'src/**'
    },
    // external: [
    //     ...Object.keys(pkg.dependencies || {}),
    //     ...Object.keys(pkg.peerDependencies || {})
    // ],
    plugins: [
        json(),
        typescript({
            typescript: require('typescript'),
            useTsconfigDeclarationDir: true
        }),
        commonjs()
        //terser()
    ]
};
