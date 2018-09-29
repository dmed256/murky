interface HeaderLink {
  label: string,
  href: string,
}

export interface MurkyConfig {
  root: string,
  profile: {
    name: string,
    title: string,
  },
  error: {
    image: string,
    imageCredit?: string,
  },
  header: {
    links: HeaderLink[],
  },
  blogJson: string | undefined,
  social: {
    github?: string,
    twitter?: string,
    linkedin?: string,
    email?: string[],
    // Filled out entries
    githubLink?: string,
    twitterLink?: string,
    linkedinLink?: string,
    fullEmail?: string,
  },
  pathname: (pathname: string) => string,
};

// @ts-ignore
const murkyConfig = (window.murkyConfig || {}) as any;

let config: MurkyConfig = {
  root: '/',
  profile: {
    name: 'My Name',
    title: 'My Title',
    ...(murkyConfig.profile || {}),
  },
  error: {
    image: '/assets/images/ohno.png',
    imageCredit: 'http://webcomicname.com',
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

// Fill out filled-out social entries
if (config.social.github) {
  config.social.githubLink = `https://github.com/${config.social.github}`;
}
if (config.social.twitter) {
  config.social.twitterLink = `https://twitter.com/${config.social.twitter}`;
}
if (config.social.linkedin) {
  config.social.linkedinLink = `https://linkedin.com/in/${config.social.linkedin}`;
}
if (config.social.email) {
  const [a, b, c] = config.social.email;
  config.social.fullEmail = `${a}@${b}.${c}`;
}

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
