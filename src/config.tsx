interface HeaderLink {
  label: string,
  href: string,
}

export interface MurkyConfig {
  root: string,
  name: string,
  header: {
    links: HeaderLink[],
  },
};

  // @ts-ignore
const murkyConfig = (window.murkyConfig || {}) as any;

let config: MurkyConfig = {
  root: '/',
  name: 'My Name',
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

// Remove tail '/' to avoid double '//' with expected absolute paths
if (config.root.endsWith('/')) {
  config.root = config.root.substr(0, config.root.length - 1);
}

export default config;
