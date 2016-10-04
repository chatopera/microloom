'use strict';
/**
 * Application for dialog system.
 */
const compose = require('./lib/compose');
const co = require('./lib/co3');
const Q = require('q');

function Microloom() {
    this.middleware = [];
}

/**
 * Use Middlewares
 * @param  {[type]} middleware [description]
 * @return {[type]}            [description]
 */
Microloom.prototype.use = function(middleware) {
    this.middleware.push(middleware);
};

/**
 * Handle Request
 * @return {[type]} [description]
 */
Microloom.prototype.handle = function(session) {
    let defer = new Q.defer();
    let ctx = { session: session };
    co(compose(this.middleware))
        .call(ctx, function(err, val) {
            if (err)
                return defer.reject(err);
            defer.resolve(ctx);
        });
    return defer.promise;
}

exports = module.exports = new Microloom();
