export interface MurkyConfig {
  root: string,
};

let config: MurkyConfig = {
  root: '/',
  // @ts-ignore
  ...(window.murkyConfig || {}),
};

// Remove tail '/' to avoid double '//' with expected absolute paths
if (config.root.endsWith('/')) {
  config.root = config.root.substr(0, config.root.length - 1);
}

export default config;
