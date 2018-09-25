interface HeaderLink {
  label: string,
  href: string,
}

export interface MurkyConfig {
  root: string,
  name: string,
  error: {
    image: string,
    label?: string,
    creditUrl?: string,
  },
  header: {
    links: HeaderLink[],
  },
  pathname: (pathname: string) => string,
};

// @ts-ignore
const murkyConfig = (window.murkyConfig || {}) as any;

let config: MurkyConfig = {
  root: '/',
  name: 'My Name',
  error: {
    image: '/assets/images/ohno.png',
    label: 'webcomicname.com',
    creditUrl: 'http://webcomicname.com',
    ...(murkyConfig.error || {}),
  },
  header: {
    links: [
      { label: 'Link 1', href: '/link1' },
      { label: 'Link 2', href: '/link2' },
      { label: 'Link 3', href: '/link3' },
    ],
    ...(murkyConfig.header || {}),
  },
  ...murkyConfig,
};

// Reroute based on config's root
config.pathname = (pathname: string) => (
  `${config.root.substr(1)}${pathname}`
);

// Convert the image to our local path
config.error.image = config.pathname(config.error.image);

// Remove tail '/' to avoid double '//' with expected absolute paths
if (config.root.endsWith('/')) {
  config.root = config.root.substr(0, config.root.length - 1);
}

export default config;
