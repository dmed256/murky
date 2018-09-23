import mdit from 'markdown-it';


export interface MDToken extends mdit.Token {
  tokenType: 'md',
}

export interface MurkyToken extends mdit.Token {
  tokenType: 'murky',
  children: Token[],
}

export type Token = MDToken | MurkyToken;
