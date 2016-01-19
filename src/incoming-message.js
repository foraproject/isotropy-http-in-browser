/* @flow */
import EventEmitter from 'events';

export type FilePartType = {
    fieldname: string;
    file: string;
    filename: string;
    encoding: string;
    mimetype: string;
};

export type FieldPartType = {
    fieldname: string;
    val: string;
    fieldnameTruncated: boolean;
    valTruncated: boolean;
    encoding: string;
    mimetype: string;
};

export type HashType = { [key: string]: string };

export type PartType = FilePartType | FieldPartType;

class IncomingMessage extends EventEmitter {
    statusCode: number;
    statusMessage: string;
    _headers: Object;
    httpVersion: string;
    method: string;
    _rawHeaders: Array<string>;
    url: string;
    __body: HashType;
    __parts: Array<PartType>;

    constructor(params: Object = {}) {
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


    __getBody() : HashType {
        return this.__body;
    }
    __setBody(val: HashType) : void {
        this.__body = val;
    }


    __getParts() : Array<PartType> {
        return this.__parts;
    }
    __setParts(val: Array<PartType>) : void {
        this.__parts = val;
    }
    __addPart(val: PartType) : void {
        this.__parts.push(val);
    }


    setTimeout(msecs: number, cb: Function) : IncomingMessage {
        setTimeout(cb, msecs);
        return this;
    }
}

export default IncomingMessage;
