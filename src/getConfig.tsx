export interface MurkyConfig {
  root: string,
};

declare var murkyConfig: MurkyConfig | undefined;

const getConfig = (): MurkyConfig => ({
  root: '/',
  ...(murkyConfig || {}),
});

export { getConfig };
