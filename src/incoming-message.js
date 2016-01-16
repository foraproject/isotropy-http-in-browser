/* @flow */
import EventEmitter from 'events';
import util from "./util";

class IncomingMessage extends EventEmitter {
    statusCode: number;
    statusMessage: string;
    _headers: Object;
    httpVersion: string;
    method: string;
    _rawHeaders: Array<string>;
    url: string;


    constructor(params: Object) {
        super();

        this.statusCode = -1;
        this.statusMessage = "";

        for (var key in params) {
            this[key] = params[key];
        }
    }


    get socket() : void {
        throw new Error("Not implemented");
    }


    get headers() : Object {
        return this._headers;
    }
    set headers(val) {
        this._headers = val;

        const rawHeaders = [];
        for (const key in val) {
            rawHeaders.push(key);
            rawHeaders.push(val[key]);
        }
        this._rawHeaders = rawHeaders;
    }

    get rawHeaders() : Array<string> {
        return this._rawHeaders;
    }


    setTimeout(msecs: number, cb: Function) : IncomingMessage {
        setTimeout(cb, msecs);
        return this;
    }
}

export default IncomingMessage;
