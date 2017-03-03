/**
 * Philly Logic Server.
 * secure requests for API calls.
 */
const test = require('ava');
const app = require('../index');

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

test.cb('Microloom#yield', t => {
    app.use(function* (ctx, next) {
        ctx.arr.push(1)
        yield next()
        yield wait(1)
        ctx.arr.push(4)
        return ctx;
    });

    app.use(function* (ctx, next) {
        ctx.arr.push(2)
        yield next()
        ctx.arr.push(3)
    });

    app.handle({
        arr: [0]
    }).then(function (result) {
        console.log(result);
        t.is(result.arr[0], 0, 'arr[0] does not match');
        t.is(result.arr[1], 1, 'arr[1] does not match');
        t.pass();
        t.end();
    }).catch(function (e) {
        console.error(e)
    });
});
