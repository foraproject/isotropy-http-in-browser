/* @flow */
import EventEmitter from 'events';
import util from "./util";

class Response extends EventEmitter {
    finished: boolean;
    socket: { writable: boolean };
    _headers: Object;

    constructor(params: Object) {
        super();
        for (var key in params) {
            this[key] = params[key];
        }
        this._headers = {};
        this.socket = { writable: true };
    }

    removeHeader(name: string) {
        if (util.isDefined(this._headers[name])) {
            this._headers[name] = undefined;
        }
    }

    setHeader(field: string, val: string) {
        this._headers[field] = val;
    }

    end(body: string) {
        this.finished = true;
        this.emit("end", body);
    }
}

export default Response;
