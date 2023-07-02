class Observer {
  private _handlers: Function[] = [];

  subscribe(listener: Function) {
    this._handlers.push(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listenerRemoved: Function) {
    this._handlers = this._handlers.filter(
      (listener) => listener !== listenerRemoved
    );
  }

  emit(...args: unknown[]) {
    this._handlers.forEach((listener) => listener.call(this, ...args));
  }
}

export default Observer;
