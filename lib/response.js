(function() {
    "use strict";

    var util = require("./util");

    var NativeResponse = function(params) {
        util.assign(this, "statusCode", params, false);
        util.assign(this, "statusMessage", params, false);
        util.assign(this, "_headers", params, false);
        util.assign(this, "headersSent", params, false);
        util.assign(this, "socket", params, false);
    };

    NativeResponse.prototype.removeHeader = function(name) {
        // body...
    };

    NativeResponse.prototype.setHeader = function(field, val) {

    };

    NativeResponse.prototype.end = function(body) {

    };

    module.exports = NativeResponse;
})();
