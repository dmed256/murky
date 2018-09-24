export interface HashPath {
  pathname: string,
  hash: string,
};

export type Listener = (nextHashPath: HashPath,
                        prevHashPath: HashPath) => void;

export interface HashLocation {
  hash: string,
  host: string,
  hostname: string,
  href: string,
  origin: string,
  pathname: string,
  port: string,
  protocol: string,
};

const splitPathname = (pathname: string): HashPath => {
  const hashIndex = pathname.indexOf('#/');
  // Get relative path
  if (hashIndex < 0) {
    pathname = '/';
  } else {
    pathname = pathname.substr(hashIndex + 2);
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }
  }

  // Get hash out
  const parts = pathname.split('#');
  pathname = parts[0];
  const hash = parts.slice(1).join('#');

  return { pathname, hash };
}

const getHashPathname = (pathname: string) => {
  if (pathname.startsWith('/')) {
    return `/#${pathname}`;
  }
  return pathname;
}

class History {
  listeners: Set<Listener>;
  pathname: string;
  hash: string;
  prev: {
    pathname: string,
    hash: string,
  };

  constructor() {
    this.listeners = new Set();

    const split = splitPathname(location.hash);
    this.pathname = split.pathname;
    this.hash = split.hash;
    this.prev = {
      pathname: '',
      hash: '',
    }

    window.addEventListener('hashchange', (event: any) => {
      this.prev = {
        pathname: this.pathname,
        hash: this.hash,
      }
      const nextHashPath = splitPathname(event.newURL);
      this.pathname = nextHashPath.pathname;
      this.hash = nextHashPath.hash;

      this.updateListeners(nextHashPath, this.prev);
    });
  }

  listen = (listener: Listener) => {
    this.listeners.add(listener);
  }

  unlisten = (listener: Listener) => {
    this.listeners.delete(listener);
  }

  updateListeners = (nextHashPath: HashPath, prevHashPath: HashPath) => {
    this.listeners.forEach((listener) => {
      listener(nextHashPath, prevHashPath);
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
  getHashPathname,
}

export default new History();
