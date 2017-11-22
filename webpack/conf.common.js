const path = require('path');

const plugins = require('./plugin.common');

module.exports = {
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, '../static'),
        filename: 'js/bundle.js'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '.json']
    },
    resolveLoader: {
        modules: ['node_modules', __dirname]
    },
    plugins
};

