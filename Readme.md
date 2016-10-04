# Microloom

## Install

```
npm install microloom
```
## Usage

```
const app = require('microloom');

// Check the session
app.use(function*(next) {
    log.debug('md#session');
    if (!this.session)
        throw new Error('session doesnt exist.');
    yield next;
});

// parse wxuser
app.use(function*(next) {
    this.wxuser = yield getUserById(user.id);
    yield next;
    // assign this.responose
    this.response = 'hello';
    // after all process, save user into database
    this.wxuser.save(function(err) {
        if (err)
            return log.error('mongoose#wxuser error', err);
        log.debug('mongoose#wxuser saved.');
    });
});

// session is passed as ctx
// reference with this.
app.handle(session)
    .then(function(result) {
        if (result.response)
            // hello
            session.send(result.response);
    }, function(err) {
        log.error(err);
    })
    .fin(function() {
        // close event.
    });
```

## License 
MIT
