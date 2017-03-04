# Microloom

**Microloom** requires node v7.6.0 or higher for ES2015 and async function support.

## Install
```
npm install microloom --save
```

## Usage
Check out [Example](https://github.com/Samurais/microloom/tree/master/test/test.js).

```
// simulate a request.
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

let app = require('microloom');
app.use(async function (ctx, next) {
    ctx.arr.push(1)
    await next()
    // process requests with Promise, Generator, Async or any object.
    await wait(1)
    ctx.arr.push(4)
    return ctx;
});

app.use(async function (ctx, next) {
    ctx.arr.push(2)
    await next()
    ctx.arr.push(3)
});

app.handle({ /* Inject ctx value */
    arr: [0]
}).then(function (result) {
    console.log(result);
    // { arr: [ 0, 1, 2, 3, 4 ] }
}).catch(function (e) {
    console.error(e)
});

```

## Contribution
```
git clone git@github.com:Samurais/microloom.git
cd microloom
npm install 
ava
```

## License 
MIT
