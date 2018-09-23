type Listener = (pathname: string) => void;

const getPathname = (pathname: string) => {
  const hashIndex = pathname.indexOf('/#');
  // Get relative path
  if (hashIndex < 0) {
    pathname = '/';
  } else {
    pathname = pathname.substr(hashIndex + 2);
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }
  }
  return pathname;
}

const getHashPathname = (pathname: string) => {
  if (pathname.startsWith('/')) {
    pathname = `/#${pathname}`;
  }
  return pathname;
}

class History {
  listeners: Set<Listener>;

  constructor() {
    this.listeners = new Set();
    window.addEventListener('hashchange', (event: any) => {
      this.updateListeners(getPathname(event.newURL));
    });
  }

  listen = (listener: Listener) => {
    this.listeners.add(listener);
  }

  unlisten = (listener: Listener) => {
    this.listeners.delete(listener);
  }

  updateListeners = (pathname: string) => {
    this.listeners.forEach((listener) => {
      listener(pathname);
    });
  }

  push = (pathname: string) => {
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }
    location.hash = pathname;
  };
}

export {
  getPathname,
  getHashPathname,
}

export default new History();
