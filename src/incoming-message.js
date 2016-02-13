/* @flow */
import EventEmitter from 'events';
import stream from "stream";

export type BodyPartType = {
  fieldname: string;
  value: string;
  filename?: string;
}

class IncomingMessage extends EventEmitter {
  statusCode: number;
  statusMessage: string;
  _headers: Object;
  httpVersion: string;
  method: string;
  _rawHeaders: Array<string>;
  url: string;
  __body: Array<BodyPartType>;
  __parts: Array<PartType>;

  constructor(params: Object = {}) {
    super();

    this.__body = {};
    this.__parts = [];

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


  setTimeout(msecs: number, cb: Function) : IncomingMessage {
    setTimeout(cb, msecs);
    return this;
  }
}

export default IncomingMessage;
