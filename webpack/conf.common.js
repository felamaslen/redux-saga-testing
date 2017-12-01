const plugins = require('./plugin.common');

module.exports = {
    entry: ['./src/index'],
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '.json']
    },
    resolveLoader: {
        modules: ['node_modules', __dirname]
    },
    plugins
};

