/* @flow */
import IncomingMessage from "./incoming-message";
import ServerResponse from "./server-response";
import Server from "./server";

const createServer = function(requestListener: (req: IncomingMessage, res: ServerResponse) => void) : Server {
    return new Server(requestListener);
};

export default {
    createServer,
    Server,
    IncomingMessage,
    ServerResponse
}
