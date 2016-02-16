/* @flow */
import parse from "parseurl";
import Server from "./server";

import globals from "./globals";

import type { EmulatedXMLHttpRequestType } from "./server";

class Dispatcher {
  static _this;

  servers: Array<{ port: number, host: string, server: Server }>;

  constructor() {
    this.servers = [];
    globals.dispatcher = this;
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
    port = port || 0;
    host = host || "";
    const servers = this.servers.filter(s => (s.host === host || s.host === "") && s.port === port);
    return servers.length ? servers[0].server : null;
  }

  remove(port: number, host: string) : void {
    port = port || 0;
    host = host || "";
    this.servers = this.servers.filter(s => s.host !== host || s.port !== port);
  }

  __XMLHttpRequest_send(xhr: EmulatedXMLHttpRequestType, data: Object) : void {
    const parsedUrl = parse(xhr);
    const server = this.get(parseInt(parsedUrl.port), parsedUrl.hostname);
    if (server) {
      server.__XMLHttpRequest_send(xhr, data);
    }
  }
}

export default Dispatcher;
