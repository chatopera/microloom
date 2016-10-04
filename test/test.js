/**
 * Philly Logic Server.
 * secure requests for API calls.
 */
const test = require('ava');
const app = require('../index');

test.cb('Microloom#app', t => {
    app.use(function*(next) {
        console.log('mw1', this);
        this.name = 'bar';
    });

    app.use(function*(next) {
        console.log('mw2', this);
    });

    app.handle({
        a: 'b'
    }).then(function(result) {
        console.log(result);
        t.is(result.session.a, 'b', 'context does not match');
        t.is(result.name, 'bar', 'response does not match');
        t.pass();
    }).fin(function() {
        console.log('fin');
        t.end();
    });
});
