import React from 'react';

import Tokens from '../../Tokens';
import { getText } from '../../tokenizer';
import * as types from '../../types';


export interface TabInfo {
  label: string,
  content: any,
};

interface TabNamespace {
  [namespace: string]: any,
};


const getTabs = (children: types.Token[]): TabInfo[] | null => {
  if (children.length !== 1) {
    console.error('Expected a \'bullet_list\' markdown child', children);
    return null;
  }

  const tabTokens = children[0].children as types.Token[];
  let isValid = tabTokens.every((token) => (
    token.type === 'list_item'
  ));
  if (!isValid) {
    console.error('Expected \'list_items\' in markdown children', tabTokens);
    return null;
  }

  const tabs = tabTokens.map((token) => ({
    label: getText(token.children[0] as types.Token),
    content: (
      <Tokens children={token.children.slice(1) as types.Token[]} />
    ),
  }));

  isValid = tabs.every(({ label }) => Boolean(label));
  if (!isValid) {
    console.error('Expected tab names in each \'bullet_list\' entry', tabTokens);
    return null;
  }

  return tabs;
}


const namespaceListeners: TabNamespace = {};

const listen = (
  namespace: string,
  onChange: (tab: number) => void,
) => {
  if (!(namespace in namespaceListeners)) {
    namespaceListeners[namespace] = new Set([onChange]);
  } else {
    namespaceListeners[namespace].add(onChange);
  }
};

const unlisten = (
  namespace: string,
  onChange: (tab: number) => void,
) => {
  if (namespace in namespaceListeners) {
    namespaceListeners[namespace].delete(onChange);
  }
}

const onTabChange = (namespace: string) => (event: any, tab: number) => {
  namespaceListeners[namespace].forEach((onChange: any) => {
    onChange(tab);
  });
};

export {
  getTabs,
  listen,
  unlisten,
  onTabChange,
};
