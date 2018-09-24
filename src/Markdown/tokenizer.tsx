import mdit from 'markdown-it';
import mditContainer from 'markdown-it-container';

import { MurkyToken, Token } from './types';
import { getHashPathname } from '../history';


const md = mdit({
  html: true,
  linkify: true,
  typographer: true,
}).use(mditContainer, 'murky', {
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
  const blockType = blockOpenToken.type;
  if (blockType === 'container_murky_open') {
    const args = blockOpenToken.info.trim().split(/\s+/);
    blockOpenToken.type = args[0];
    blockOpenToken.info = args.slice(1).join(' ');
  }
  else if (blockType.endsWith('_open')) {
    blockOpenToken.type = blockType.substr(0, blockType.length - 5);
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

const attrProps = (attrs: string[][] | null) => {
  if (!attrs || !attrs.length) {
    return {};
  }
  return attrs.reduce((obj: any, [prop, value]) => {
    let reactProp = prop;
    let reactValue = value;
    switch (prop) {
      case 'href':
        reactValue = getHashPathname(value);
        console.log(reactValue);
        break;
    }
    return { ...obj, [reactProp]: reactValue };
  }, {});
};

export {
  attrProps,
};

export default tokenizer;
