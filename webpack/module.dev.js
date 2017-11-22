const sassLoader = require('./sassLoader');

const moduleConfig = require('./module.common');

module.exports = {
    ...moduleConfig,
    loaders: [
        ...moduleConfig.loaders,
        {
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loaders: `strip-loader?${JSON.stringify({ env: ['PROD'] })}`
        },
        {
            test: /\.scss$/,
            exclude: [/fonts\.scss$/, /node_modules/],
            loaders: `style-loader!${sassLoader}`
        },
        {
            test: /fonts\.scss$/,
            exclude: /node_modules/,
            loaders: 'style-loader!css-loader!sass-loader'
        }
    ]
};

