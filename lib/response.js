(function() {
    "use strict";

    var EventEmitter = require('events').EventEmitter;
    var util = require("./util");

    var Response = function(params) {
        EventEmitter.call(this);
        this._headers = {};
        this.socket = { writable: true };
        for (var key in params) {
            this[key] = params[key];
        }
    };

    Response.prototype = Object.create(EventEmitter.prototype);
    Response.prototype.constructor = Request;


    Response.prototype.removeHeader = function(name) {
        if (util.isDefined(this._headers[name])) {
            this._headers[name] = undefined;
        }
    };


    Response.prototype.setHeader = function(field, val) {
        this._headers[field] = val;
    };


    Response.prototype.end = function(body) {
        console.log("called end");
    };
    

    module.exports = Response;
})();
