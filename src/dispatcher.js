/* @flow */
import Server from "./server";
import type { RequestArgsType } from "./server";

class Dispatcher {
    servers: Array<{ port: number, host: string, server: Server }>;

    constructor() {
        this.servers = [];
    }

    add(port: number, host: string, server: Server) : void {
        if (!port) {
            throw new Error(`"${port}" is not a valid port. Cannot bind.`)
        }
        host = host || "";
        if (!(this.get(port, host))) {
            this.servers.push({ host, port, server});
        } else {
            throw new Error(`EADDRINUSE: There is already a listener on ${host}:${port}`);
        }
    }

    get(port: number, host: string) : ?Server {
        host = host || "";
        const servers = this.servers.filter(s => (s.host === host || s.host === "") && s.port === port);
        return servers.length ? servers[0].server : null;
    }

    remove(port: number, host: string) : void {
        host = host || "";
        this.servers = this.servers.filter(s => s.host !== host || s.port !== port);
    }

    makeRequest(port: number, host: string, _options: RequestArgsType) : void {
        const options = Object.assign({}, _options);
    }
}

export default Dispatcher;
