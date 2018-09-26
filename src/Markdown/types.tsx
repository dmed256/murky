import mdit from 'markdown-it';


export interface MDToken extends mdit.Token {
  tokenType: 'md',
}

export interface MurkyToken extends mdit.Token {
  tokenType: 'murky',
  children: Token[],
}

export interface MurkyPluginToken extends mdit.Token {
  tokenType: 'murky_plugin',
  plugin: string,
  props: object,
  children: Token[],
}

export type Token = MDToken | MurkyToken | MurkyPluginToken;
