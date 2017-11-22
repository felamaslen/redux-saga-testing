const jsonToSassVars = require('./jsonToSassVars');

const sassVariablesObj = require('../src/constants/styles');
const sassVariables = encodeURIComponent(jsonToSassVars(sassVariablesObj));

const cssLoaderOptions = JSON.stringify({
    importLoaders: 1
});

const postcssOptions = {
};

const postcssLoader = `postcss-loader?${postcssOptions}`;

module.exports = `css-loader?${cssLoaderOptions}!${postcssLoader}!sass-loader!prepend-loader?data=${sassVariables}`;

