import mdit from 'markdown-it';
import mditContainer from 'markdown-it-container';

import { MurkyToken, Token } from './types';


const md = mdit({
  html: true,
  linkify: true,
  typographer: true,
}).use(mditContainer, 'tabs', {
  validate: () => true,
});

interface BlockTokenInfo {
  i: number,
  token: MurkyToken,
}

const tokenizeBlock = (
  tokens: mdit.Token[],
  i: number,
  blockOpenToken: mdit.Token
): BlockTokenInfo => {
  // Trim down name: container_X_open -> X
  const blockType = blockOpenToken.type
  let blockName = blockType.substr(0, blockType.length - 5);
  if (blockName.startsWith('container_')) {
    blockName = blockName.substr(10);
  }
  // Block token children
  const children = [];

  while (i < tokens.length) {
    const token = tokens[i++];
    const { type } = token;

    // Start a new block
    if (type.endsWith('_open')) {
      const { i: i2, token: blockToken } = tokenizeBlock(tokens, i, token);
      i = i2;
      children.push(blockToken);
    }
    // Closing token
    else if (type.endsWith('_close')) {
      break;
    }
    // Simplify inline elements
    else if (type === 'inline') {
      children.push(tokenizeBlock(
        token.children,
        0,
        { type: 'inline_open' } as any,
      ).token);
    }
    // Fence -> Code
    else if (type === 'fence') {
      children.push({
        tokenType: 'md' as 'md',
        ...token,
        type: 'code',
        tag: '',
      });
    }
    // Misc token
    else {
      children.push({
        tokenType: 'md' as 'md',
        ...token,
      });
    }
  }
  return {
    i,
    token: {
      tokenType: 'murky' as 'murky',
      ...blockOpenToken,
      type: blockName,
      children,
    },
  };
};

const tokenizer = (content: string): Token[] => (
  tokenizeBlock(
    md.parse(content, {}),
    0,
    { type: 'root_open' } as any,
  ).token.children
);

export default tokenizer;
