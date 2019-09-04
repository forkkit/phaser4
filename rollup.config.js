import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
// import {terser} from "rollup-plugin-terser";

export default {
 input: 'src/index.ts',
 output: [
  {
   file: pkg.main,
   format: 'cjs'
  },
  {
   file: pkg.module,
   format: 'es'
  },
  {
   file: pkg.browser,
   format: 'iife',
   name: 'Phaser'
  }
 ],
 external: [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
 ],
 plugins: [
  typescript({
   typescript: require('typescript'),
   useTsconfigDeclarationDir: true
  }),
  //terser() // minifies generated bundles
 ]
};