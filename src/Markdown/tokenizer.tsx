import mdit from 'markdown-it';
import mditContainer from 'markdown-it-container';

import { MDToken, BlockToken } from './types';


const md = mdit({
  html: true,
  linkify: true,
  typographer: true,
}).use(mditContainer, 'tabs', {
  validate: () => true,
});

interface BlockTokenInfo {
  i: number,
  token: BlockToken,
}

const tokenizeBlock = (tokens: MDToken[], i: number, name: string): BlockTokenInfo => {
  const blockTokens = [];
  while (i < tokens.length) {
    const token = tokens[i++];
    const { type } = token;

    if (type.endsWith('_open')) {
      // container_X_open -> X
      let blockName = type.substr(0, type.length - 5);
      if (blockName.startsWith('container_')) {
        blockName = blockName.substr(10);
      }

      const { i: i2, token: blockToken } = tokenizeBlock(tokens, i, blockName);
      i = i2;
      blockTokens.push(blockToken);
    }
    else if (type.endsWith('_close')) {
      break;
    }
    else if (type === 'inline') {
      blockTokens.push(tokenizeBlock(token.children, 0, 'inline').token);
    }
    else if (type === 'fence') {
      blockTokens.push({
        ...token,
        type: 'code',
        tag: '',
      });
    } else {
      blockTokens.push(token);
    }
  }
  return {
    i,
    token: {
      type: name,
      tokens: blockTokens,
    },
  };
};

const tokenizer = (content: string) => (
  tokenizeBlock(md.parse(content, {}), 0, 'root').token.tokens
);

export default tokenizer;
