const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassLoader = require('./sassLoader');

const moduleConfig = require('./module.common');

module.exports = () => ({
    ...moduleConfig,
    loaders: [
        ...moduleConfig.loaders,
        {
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loaders: `strip-loader?${JSON.stringify({ env: ['DEV'] })}!eslint-loader`
        },
        {
            test: /\.scss$/,
            exclude: [/fonts\.scss$/, /node_modules/],
            loaders: ExtractTextPlugin.extract(sassLoader)
        }
    ]
});

