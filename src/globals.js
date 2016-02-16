/* @flow */
import Dispatcher from "./dispatcher";

class Globals {

  _dispatcher: Dispatcher;

  get dispatcher() : Dispatcher {
    return this._dispatcher;
  }

  set dispatcher(dispatcher: Dispatcher) {
    this._dispatcher = dispatcher;
  }

}

const globals = new Globals();

export default globals;
