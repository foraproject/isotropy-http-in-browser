/* @flow */
import globals from "./globals";
import IncomingMessage from "./incoming-message";
import ServerResponse from "./server-response";
import Server from "./server";

//Monkey patch XMLHttpRequest
XMLHttpRequest.prototype.send = function() {
  globals.dispatcher.__XMLHttpRequest_send.apply(globals.dispatcher, [this].concat(arguments));
};

const createServer = function(requestListener: (req: IncomingMessage, res: ServerResponse) => void) : Server {
  return new Server(requestListener);
};


export default {
  createServer,
  Server,
  IncomingMessage,
  ServerResponse
}
