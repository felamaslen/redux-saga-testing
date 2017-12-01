const { run } = require('./app');

if (process.env.NODE_ENV !== 'test') {
    run();
}

