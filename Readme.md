# Microloom

**Microloom** requires node v7.6.0 or higher for ES2015 and async function support.

## Install
```
npm install microloom --save
```

## Usage
Check out [Example](https://github.com/Samurais/microloom/tree/master/test/test.js).

```
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
        console.log(result);
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
