/* @flow */
import { EventEmitter } from 'events';
import Dispatcher from "./dispatcher";
import IncomingMessage from "./incoming-message";
import ServerResponse from "./server-response";

let dispatcher: Dispatcher;

export type EmulatedXMLHttpRequestType = {
  method: string,
  _parsedUrl: {
    path: string,
    pathname: string,
    search: string,
    query: string,
    href: string
  },
  requestHeaders: Object,
  send: () => void
};

export type CookieType = {
  name: string,
  value: string
};

class Server extends EventEmitter {
  timeout: number;
  port: number;
  host: string;
  maxHeadersCount: number;
  dispatcher: Dispatcher;
  requestListener: (req: IncomingMessage, res: ServerResponse) => void;

  constructor(requestListener: (req: IncomingMessage, res: ServerResponse) => void) {
    super();
    this.requestListener = requestListener;

    if (!dispatcher) {
      dispatcher = new Dispatcher();
    }
    this.dispatcher = dispatcher;

    this.timeout = 120000;
    this.maxHeadersCount = 1000;
  }

  get connections() : number {
    return 1;
  }

  getConnections(cb: (err: ?Object, connections: number) => void) {
    cb(null, 1);
  }

  get address() : { port: number, family: string, address: string } {
    return { port: this.port, family: 'IPv4', address: this.host };
  }

  listen() {
    let cb;
    if (arguments.length === 3) {
      this.port = arguments[0];
      this.host = arguments[1];
      cb = arguments[2];
    } else if (arguments.length === 2) {
      this.port = arguments[0];
      if (typeof arguments[1] === "function") {
        cb = arguments[1];
      } else {
        this.host = arguments[1];
      }
    } else if (arguments.length === 1) {
      this.port = arguments[0];
      this.host = "";
    }
    this.dispatcher.add(this.port, this.host, this);
    this.emit("listening");

    if (cb) {
      cb();
    }
  }

  close() : void {
    if (this.port) {
      this.dispatcher.remove(this.port, this.host);
    } else {
      throw new Error("Server is not listening.");
    }
  }

  setTimeout(msecs: number, cb: Function) : Server {
    setTimeout(cb, msecs);
    return this;
  }


  __XMLHttpRequest_send(xhr: EmulatedXMLHttpRequestType, data: Object) {
    console.log(xhr);
    const req = new IncomingMessage();
    req.method = xhr.method;
    req.url = xhr._parsedUrl.path;
    req.headers = xhr.requestHeaders;

    const res = new ServerResponse();
    res.setHeader("Date", Date.now().toString());

    this.requestListener(req, res);
  }
}

export default Server;
