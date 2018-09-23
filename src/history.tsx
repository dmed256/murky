type Listener = (pathname: string) => void;

class History {
  listeners: Set<Listener>;

  constructor() {
    this.listeners = new Set();
  }

  listen = (listener: Listener) => {
    this.listeners.add(listener);
  }

  unlisten = (listener: Listener) => {
    this.listeners.delete(listener);
  }

  push = (pathname: string) => {
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }
    location.hash = pathname;
    this.listeners.forEach((listener) => {
      listener(pathname);
    });
  };
}

export default new History();
