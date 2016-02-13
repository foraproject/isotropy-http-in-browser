/* @flow */
import Dispatcher from "./dispatcher";

class Globals {

  _dispatcher: Dispatcher;

  get dispatcher() {
    return this._dispatcher;
  }

  set dispatcher(dispatcher) {
    this._dispatcher = dispatcher;
  }

}

const globals = new Globals();

export default globals;
