/* eslint-disable no-sync, init-declarations */
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const webpackConfig = require('./conf.common');
const moduleConfigDev = require('./module.dev');

module.exports = (...args) => ({
    ...webpackConfig,
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        ...webpackConfig.entry
    ],
    output: {
        path: '/',
        publicPath: '/',
        filename: 'js/bundle.js'
    },
    plugins: [
        ...webpackConfig.plugins(...args),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new Dotenv({ path: '.env' })
    ],
    module: moduleConfigDev
});

