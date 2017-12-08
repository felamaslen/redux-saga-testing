/* eslint-disable global-require */
const path = require('path');
const express = require('express');
const winston = require('winston');
const webpack = require('webpack');
const { version } = require('../package.json');
const evaluatePostfix = require('./evaluate-postfix');
const evaluateInfix = require('./evaluate-infix');

function run() {
    const app = express();

    app.get('/evaluate-postfix', (req, res) => {
        const raw = decodeURIComponent(req.query.postfix || '');

        try {
            const result = evaluatePostfix(raw);

            res.json({ result });
        }
        catch (err) {
            res.status(400)
                .json({ error: true });
        }
    });

    app.get('/evaluate-infix', (req, res) => {
        const raw = decodeURIComponent(req.query.infix || '');

        try {
            const result = evaluateInfix(raw);

            res.json({ result });
        }
        catch (err) {
            res.status(400)
                .json({ error: true });
        }
    });

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../src/templates'));

    app.get('/', (req, res) => res.render('index', {
        htmlWebpackPlugin: {
            options: {
                version,
                externalStyles: process.env.NODE_ENV === 'production' ||
                    (req.query.prod && req.query.prod === 'true')
            }
        }
    }));

    if (process.env.NODE_ENV === 'development') {
        const webpackConfig = require('../webpack.config')();

        const compiler = webpack(webpackConfig);

        app.use(require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true,
                modules: false,
                chunks: false,
                reasons: false
            },
            hot: true,
            quiet: false,
            noInfo: false
        }));

        app.use(require('webpack-hot-middleware')(compiler, {
            log: console.log
        }));
    }

    app.use(express.static(path.join(__dirname, '../static')));

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        winston.log('info', `Server listening on port ${port}`);
    });
}

module.exports = {
    run
};

