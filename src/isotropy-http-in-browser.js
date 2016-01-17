/* @flow */
import IncomingMessage from "./incoming-message";
import ServerResponse from "./server-response";
import Server from "./server";

const createServer = function(requestListener) {
    return new Server(requestListener);
};

export default {
    createServer,
    Server,
    IncomingMessage,
    ServerResponse
}
