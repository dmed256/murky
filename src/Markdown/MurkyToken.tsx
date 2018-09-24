import React from 'react';

import Tokens from './Tokens';
import { Indent, Note, Tabs } from './plugins';
import { attrProps } from './tokenizer';
import * as types from './types';


interface Props {
  token: types.MurkyToken;
}

const MurkyToken = ({ token }: Props) => {
  switch (token.type) {
    case 'blockquote':
    case 'bullet_list':
    case 'em':
    case 'heading':
    case 'inline':
    case 'link':
    case 'list_item':
    case 'paragraph':
    case 'strong':
      return (
        <Tokens
          tokens={token.children}
          tag={token.tag}
          props={attrProps(token.attrs)}
        />
      );
    case 'tabs':
      return (
        <Tabs
          namespace={token.info}
          tokens={token.children}
        />
      );
    case 'indent':
      return (
        <Indent tokens={token.children} />
      )
    case 'note':
      return (
        <Note tokens={token.children} />
      );
    default:
      console.error(`Cannot handle murky token with type: ${token.type}`);
      return null;
  }
};

export default MurkyToken;
