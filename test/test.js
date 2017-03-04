/**
 * Philly Logic Server.
 * secure requests for API calls.
 */
const test = require('ava');
const app = require('../index');

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

test.skip.cb('Microloom#yield', t => {
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

test.skip.cb('Microloom#async', t => {
    app.use(async function (ctx, next) {
        ctx.arr.push(1)
        await next()
        await wait(1)
        ctx.arr.push(4)
        return ctx;
    });

    app.use(async function (ctx, next) {
        ctx.arr.push(2)
        await next()
        ctx.arr.push(3)
    });

    app.handle({
        arr: [0]
    }).then(function (result) {
        console.log('result', result);
        t.is(result.arr[0], 0, 'arr[0] does not match');
        t.is(result.arr[1], 1, 'arr[1] does not match');
        t.pass();
        t.end();
    }).catch(function (e) {
        console.error(e)
    });
});


test.only.cb('Microloom#check next', t => {
    app.use(async function (ctx, next) {
        ctx.arr.push(1)
        await next()
        await wait(1)
        ctx.arr.push(6)
        return ctx;
    });

    app.use(async function (ctx, next) {
        ctx.arr.push(2)
        if (ctx.ismw3)
            await next()
        ctx.arr.push(5)
    });

    app.use(async function (ctx, next) {
        ctx.arr.push(3)
        ctx.arr.push(4)
    });

    app.handle({
        ismw3: false,
        arr: [0]
    }).then(function (result) {
        console.log('result', result);
        t.is(result.arr[0], 0, 'arr[0] does not match');
        t.is(result.arr[1], 1, 'arr[1] does not match');
        t.pass();
        t.end();
    }).catch(function (e) {
        console.error(e)
    });
})


test.only.cb('Microloom#check next 2', t => {
    app.use(async function (ctx, next) {
        ctx.arr.push(1)
        await next()
        await wait(1)
        ctx.arr.push(6)
        return ctx;
    });

    app.use(async function (ctx, next) {
        ctx.arr.push(2)
        if (ctx.ismw3)
            await next()
        ctx.arr.push(5)
    });

    app.use(async function (ctx, next) {
        ctx.arr.push(3)
        ctx.arr.push(4)
    });

    app.handle({
        ismw3: true,
        arr: [0]
    }).then(function (result) {
        console.log('result', result);
        t.is(result.arr[0], 0, 'arr[0] does not match');
        t.is(result.arr[1], 1, 'arr[1] does not match');
        t.pass();
        t.end();
    }).catch(function (e) {
        console.error(e)
    });
})