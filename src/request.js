/* @flow */
import EventEmitter from 'events';
import util from "./util";

class Request extends EventEmitter {
    constructor(params: Object) {
        super();
        for (var key in params) {
            this[key] = params[key];
        }
    }
}

export default Request;
