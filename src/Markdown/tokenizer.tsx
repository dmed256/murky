import mdit from 'markdown-it';
import mditContainer from 'markdown-it-container';

import {
  MurkyToken,
  MurkyPluginToken,
  Token,
} from './types';
import { getHashPathname } from '../history';


//---[ Types ]--------------------------
interface BlockTokenInfo {
  i: number,
  token: MurkyToken,
}

interface Plugin {
  name: string,
  Component: any,
  requiredProps: string[],
  optionalProps: string[],
  varArgs: boolean,
}

interface Plugins {
  [plugin: string]: Plugin,
}
//======================================


const md = mdit({
  html: true,
  linkify: true,
  typographer: true,
}).use(mditContainer, 'murky', {
  validate: () => true,
});


//---[ Plugins ]------------------------
const plugins: Plugins = {};

const addPlugin = (plugin: Plugin) => {
  plugins[plugin.name] = plugin;
};

const getPlugin = (plugin: string): any => (
  plugins[plugin]
);

const argToProp = (arg: string) => {
  let key = '';
  let value = arg;
  // Try to find a : to split the values
  const splitMatch = arg.match(/[^\\]:/) as any;
  if (splitMatch) {
    let splitIndex = splitMatch.index + splitMatch[0].length - 1;
    key = arg.slice(0, splitIndex);
    value = arg.slice(splitIndex + 1);
  }
  return { key, value };
}

const processMurkyContainer = (
  token: mdit.Token,
  children: any[],
): MurkyPluginToken | undefined => {
  let args = token.info.trim().split(/\s+/);

  // Check if plugin exists
  const pluginName = args.splice(0, 1)[0];
  const plugin = plugins[pluginName];
  if (!plugin) {
    console.error(`Unknown plugin: ${pluginName}`);
    return undefined;
  }

  // Split args into prop:value pairs (if : is included)
  const positionArgs: string[] = [];
  const kwargs = {};
  let printedError = false;
  args.forEach((arg) => {
    const prop = argToProp(arg);
    // Make sure we haven't found a kwarg before
    if (!prop.key
     && Object.keys(kwargs).length
     && !printedError) {
      console.error(
        `${pluginName}: Found prop [${prop.key}] after a keyword arg: [${args}]`
      );
      printedError = true;
    }
    if (prop.key) {
      kwargs[prop.key] = prop.value;
    } else {
      positionArgs.push(prop.value);
    }
  });
  if (printedError) {
    return undefined;
  }

  args = positionArgs;

  const rProps = plugin.requiredProps.filter((prop) => !(prop in kwargs));
  const oProps = plugin.optionalProps.filter((prop) => !(prop in kwargs));

  // Required props aren't set
  if (args.length < rProps.length) {
    console.error(
      `Plugin [${pluginName}] is missing props [${rProps.slice(args.length)}]`
    );
    return undefined;
  }
  // Too many props
  const propCount = rProps.length + oProps.length;
  if (!plugin.varArgs && (args.length > propCount)) {
    console.error(
      `Plugin [${pluginName}] has too many props [${args.slice(propCount)}]`
    );
    return undefined;
  }

  // Create plugin token
  const pluginToken = {
    tokenType: 'murky_plugin',
    plugin: pluginName,
    props: kwargs,
  } as any;

  // Set props
  let argc = 0;
  [...rProps, ...oProps].forEach((prop) => {
    pluginToken.props[prop] = args[argc++];
  });
  // Set varargs
  pluginToken.varargs = args.slice(propCount);

  return pluginToken as MurkyPluginToken;
}
//======================================

const tokenizeBlock = (
  tokens: mdit.Token[],
  i: number,
  blockToken: mdit.Token,
): BlockTokenInfo | undefined => {
  // Block token children
  const children: any[] = [];

  // Trim down name: container_X_open -> X
  const blockType = blockToken.type;
  if (blockType === 'container_murky_open') {
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

const tokenizer = (content: string): Token[] => {
  const ret = tokenizeBlock(
    md.parse(content, {}),
    0,
    { type: 'root_open' } as any,
  );
  return ret ? ret.token.children : [];
};

//---[ Utils ]--------------------------
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
      case 'children':
      case 'key':
        return obj;
    }
    return { ...obj, [reactProp]: reactValue };
  }, {});
};

const getBlockText = (token: Token): string => (
  (token.children as Token[] || []).map((child: Token) => (
    getText(child)
  )).join('')
);

const getText = (token: Token): string => {
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
