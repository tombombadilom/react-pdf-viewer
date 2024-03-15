const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const path = require('path');

const rootPackagePath = process.cwd();
const input = path.join(rootPackagePath, 'src/index.ts');
const pkg = require(path.join(rootPackagePath, 'package.json'));

const outputDir = path.join(rootPackagePath, 'lib');
const pgkName = pkg.name.split('/').pop();

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const plugins = [json(), typescript()];

// module.exports = [
//     // CJS
//     {
//         input,
//         output: {
//             exports: 'named',
//             file: path.join(outputDir, `cjs/${pgkName}.js`),
//             format: 'cjs',
//         },
//         external,
//         plugins,
//     },

//     // Minified CJS
//     {
//         input,
//         output: {
//             exports: 'named',
//             file: path.join(outputDir, `cjs/${pgkName}.min.js`),
//             format: 'cjs',
//         },
//         external,
//         plugins: plugins.concat([terser()]),
//     },
// ];
// ...
module.exports = [
    // CJS configurations...
    
    // Add an ESM bundle configuration
    {
        input,
        output: {
            dir: path.join(outputDir, 'esm'), // Utilisez `dir` pour écrire dans un répertoire si vous générez plusieurs morceaux
            entryFileNames: `${pgkName}.js`, // Nom du fichier pour l'entrée principale
            format: 'es', // Format ES module
            sourcemap: true // Optionnel, si vous voulez des source maps
        },
        external,
        plugins,
    },

    // Minified ESM
    {
        input,
        output: {
            dir: path.join(outputDir, 'esm'),
            entryFileNames: `${pgkName}.min.js`,
            format: 'es',
            sourcemap: true
        },
        external,
        plugins: plugins.concat([terser()]), // Concaténer terser plugin pour la minification
    },
];

