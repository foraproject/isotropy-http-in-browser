(function() {
    "use strict";

    var EventEmitter = require('events').EventEmitter;
    var util = require("./util");

    var Request = function(params) {
        EventEmitter.call(this);
        for (var key in params) {
            this[key] = params[key];
        }
    };

    Request.prototype = Object.create(EventEmitter.prototype);
    Request.prototype.constructor = Request;

    module.exports = Request;
})();
