'use strict';
/**
 * Application for dialog system.
 */
const compose = require('koa-compose');
const co = require('co');

function Microloom() {
    this.middleware = [];
}

/**
 * Use Middlewares
 * @param  {[type]} middleware [description]
 * @return {[type]}            [description]
 */
Microloom.prototype.use = function (middleware) {
    this.middleware.push(middleware);
};

/**
 * Handle Request
 * @return {[type]} [description]
 */
Microloom.prototype.handle = function (session) {
    return compose(this.middleware.map((fn) => co.wrap(fn)))(session);
}

exports = module.exports = new Microloom();
