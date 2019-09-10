import typescript from 'rollup-plugin-typescript2';
// import {terser} from "rollup-plugin-terser";

const pkg = require('./package.json');

export default {
    input: 'src/index.ts',
    output: [
        { file: pkg.main, name: 'phaser', format: 'umd', sourcemap: true },
    ],
    watch: {
        chokidar: true,
        include: './src/**'
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
            tsconfig: './tsconfig.umd.json',
            useTsconfigDeclarationDir: true
        }),
        //terser()
    ]
};
