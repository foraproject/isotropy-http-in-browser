import Server from "./server";

export type NameValuePairType = {
    name: string,
    value: string
};

export type MakeRequestArgsType = {
    port?: number,
    host?: string,
    url: string,
    method?: string,
    body: string,
    cookies: Array<NameValuePairType>
};

class Dispatcher {
    servers: Array<Server> = [];

    add(port: string, host: string, server: Server) {
        if (!port) {
            throw new Error(`"${port}" is not a valid port. Cannot bind.`)
        }
        host = host || "";
        if (!(this.get(port, host))) {
            this.servers.push({ host, port, server});
        } else {
            throw new Error(`EADDRINUSE: There is already a listener on ${host}:${port}`);
        }
        return { host, port };
    }

    get(port: string, host: string) {
        host = host || "";
        const server = this.servers.filter(s => (s.host === host || s.host === "") && s.port === port);
        return server.length ? server[0] : null;
    }

    remove(port: string, host: string) {
        host = host || "";
        this.servers = this.servers.filter(s => s.host !== host || s.port !== port);
    }

    makeRequest(_options: MakeRequestArgsType) {
        const options = Object.assign({}, _options);
        options.host = options.host || "localhost";
    }
}

export default Dispatcher;
