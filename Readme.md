# Microloom

**Microloom** requires node v7.6.0 or higher for ES2015 and async function support.

## Install

```
npm install microloom --save
```
## Usage

```
    app.use(async function* (ctx, next) {
        ctx.arr.push(1)
        await next()
        await wait(1)
        ctx.arr.push(4)
        return ctx;
    });

    app.use(async function* (ctx, next) {
        ctx.arr.push(2)
        await next()
        ctx.arr.push(3)
    });

    app.handle({
        arr: [0]
    }).then(function (result) {
        console.log(result);
    }).catch(function (e) {
        console.error(e)
    });
```

## License 
MIT
