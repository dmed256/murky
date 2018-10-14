import mdit from 'markdown-it';

import markdownContainer, { ContainerInfo } from './mdplugins/container';
import * as types from './types';
import { getHashPathname } from '../history';


//---[ Types ]--------------------------
interface BlockTokenInfo {
  i: number,
  token: types.MurkyToken,
}

interface Plugin {
  name: string,
  Component: any,
  requiredProps: string[],
  optionalProps: string[],
}

interface Plugins {
  [plugin: string]: Plugin,
}
//======================================


const md = mdit({
  html: true,
  linkify: true,
  typographer: true,
}).use(markdownContainer);


//---[ Plugins ]------------------------
const plugins: Plugins = {};

const addPlugin = (plugin: Plugin) => {
  plugins[plugin.name] = plugin;
};

const getPlugin = (plugin: string): any => (
  plugins[plugin]
);

const processMurkyContainer = (
  token: mdit.Token,
  children: any[],
): types.MurkyPluginToken | undefined => {
  // TODO: Handle __depth for help debugging
  const { __plugin, props } = token.info as unknown as ContainerInfo;

  // Check if plugin exists
  const plugin = plugins[__plugin];
  if (!plugin) {
    throw Error(`Unknown plugin: '${__plugin}' (props: ${JSON.stringify(props)})`);
  }

  const missingProps = (
    plugin
      .requiredProps
      .filter((prop) => (
        !(prop in props)
      ))
  );

  if (missingProps.length > 0) {
    throw Error(
      `Plugin [${__plugin}] is missing props [${missingProps}]`
    );
  }

  return {
    tokenType: 'murky_plugin',
    plugin: __plugin,
    props,
  } as types.MurkyPluginToken;
}
//======================================

const tokenizeBlock = (
  tokens: mdit.Token[],
  i: number,
  blockToken: mdit.Token,
): BlockTokenInfo | undefined => {
  // Block token children
  const children: any[] = [];

  const blockType = blockToken.type;
  if (blockType === 'murky_container_open') {
    blockToken = processMurkyContainer(blockToken, children) as any;
    if (!blockToken) {
      return undefined;
    }
  }
  else if (blockType.endsWith('_open')) {
    blockToken.type = blockType.substr(0, blockType.length - 5);
  }

  while (i < tokens.length) {
    const token = tokens[i++];
    const { type } = token;

    // Start a new block
    if (type.endsWith('_open')) {
      const ret = tokenizeBlock(tokens, i, token);
      if (!ret) {
        return undefined;
      }
      const { i: i2, token: newBlockToken } = ret;
      i = i2;
      children.push(newBlockToken);
    }
    // Closing token
    else if (type.endsWith('_close')) {
      break;
    }
    // Simplify inline elements
    else if (type === 'inline') {
      const ret = tokenizeBlock(
        token.children,
        0,
        { type: 'inline_open' } as any
      );
      if (!ret) {
        return undefined;
      }
      children.push(ret.token);
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
      ...blockToken,
      children,
    },
  };
};

const tokenizer = (content: string): types.Token[] => {
  const tokens = md.parse(content, {});
  const ret = tokenizeBlock(tokens,
                            0,
                            { type: 'root_open' } as any);
  return ret ? ret.token.children : [];
};

//---[ Utils ]--------------------------
const attrProps = (attrs: string[][] | null) => {
  if (!attrs || !attrs.length) {
    return {};
  }
  return attrs.reduce((obj: any, [prop, value]) => {
    const reactProp = prop;
    let reactValue = value;
    switch (prop) {
      case 'href':
        reactValue = getHashPathname(value);
        break;
      case 'children':
      case 'key':
        return obj;
    }
    return { ...obj, [reactProp]: reactValue };
  }, {});
};

const getBlockText = (token: types.Token): string => (
  (token.children as types.Token[] || [])
    .map((child: types.Token) => (
      getText(child)
    ))
    .join('')
);

const getText = (token: types.Token): string => {
  if (token.content) {
    return token.content;
  }
  switch (token.type) {
    case 'heading':
    case 'inline':
    case 'paragraph':
      return getBlockText(token);
    default:
      return '';
  }
};
//======================================

export {
  addPlugin,
  getPlugin,
  attrProps,
  getText,
};

export default tokenizer;
