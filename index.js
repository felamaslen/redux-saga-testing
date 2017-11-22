const path = require('path');
const express = require('express');
const winston = require('winston');
const { version } = require('./package.json');

function evaluatePostfix(raw) {
    if (!raw.length) {
        throw new Error('invalid string');
    }

    const operators = {
        '+': (arg1, arg2) => arg1 + arg2,
        '-': (arg1, arg2) => arg1 - arg2,
        '*': (arg1, arg2) => arg1 * arg2,
        '/': (arg1, arg2) => arg1 / arg2
    };

    const result = raw
        .replace(/(\s+|,)/, ' ')
        .split(' ')
        .reduce((stack, char) => {
            if (char in operators) {
                const arg2 = stack.pop();
                const arg1 = stack.pop();

                return [...stack, operators[char](arg1, arg2)];
            }

            return [...stack, Number(char)];

        }, []);

    if (result.length !== 1) {
        throw new Error('invalid string');
    }

    return result[0];
}

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

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'src/templates'));

    app.get('/', (req, res) => res.render('index', {
        htmlWebpackPlugin: {
            options: {
                version,
                externalStyles: process.env.NODE_ENV === 'production' ||
                    (req.query.prod && req.query.prod === 'true')
            }
        }
    }));

    app.use(express.static(path.join(__dirname, 'static')));

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        winston.log('info', `Server listening on port ${port}`);
    });
}

if (process.env.NODE_ENV !== 'test') {
    run();
}

