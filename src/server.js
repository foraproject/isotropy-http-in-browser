/* @flow */
import EventEmitter from 'events';
import Dispatcher from "./dispatcher";
import IncomingMessage from "./incoming-message";
import ServerResponse from "./server-response";

let dispatcher: Dispatcher;

class Server  extends EventEmitter {
    timeout: number;
    port: number;
    host: string;
    maxHeadersCount: number;

    constructor(requestListener) {
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

    getConnections(cb: (err: Object, connections: number) => void) {
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

    _handle(request) {
        const req = new IncomingMessage();
        req.url = request.url;
        req.method = request.method;
        req.headers = request.headers;

        const res = new ServerResponse();
        res._setHeader("Date", Date.now().toString());

        this.requestListener(req, res);
    }
}

export default Server;
