import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import scss from 'rollup-plugin-scss';


export default {
    external: ['vue'],
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'BasicDropdown',
        exports: 'named',
        format: 'cjs',
        globals: {
            vue: 'vue'
        }
    },
    plugins: [
        scss(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            scss: true,
            preprocessStyles: true
        }),
        commonjs(),
        buble(), // Transpile to ES5
    ],
};