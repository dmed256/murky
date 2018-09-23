import mdit from 'markdown-it';


export type MDToken = mdit.Token;
export type Token = MDToken | BlockToken;

export interface BlockToken {
  type: string,
  tokens: Token[],
}
