/* @flow */
import EventEmitter from 'events';
import Dispatcher from "./dispatcher";

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

    listen(args: any) {
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
        }
        this.port = this.port || 80;
        this.host = this.host || "localhost";
        this.dispatcher.add(this.port, this.host, this);
        this.emit("listening");
        if (cb) {
            cb();
        }
    }

    close() : void {
        if (this.port) {
            this.dispatcher.close(this.port, this.host);
        } else {
            throw new Error("Server is not listening.");
        }
    }

    setTimeout(msecs: number, cb: Function) : Server {
        setTimeout(cb, msecs);
        return this;
    }
}

export default Server;
