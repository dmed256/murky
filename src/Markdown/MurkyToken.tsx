import React from 'react';

import Tokens from './Tokens';
import Heading from './Heading';
import { attrProps, getText } from './tokenizer';
import * as types from './types';


interface Props {
  token: types.MurkyToken;
}

const MurkyToken = ({ token }: Props) => {
  switch (token.type) {
  case 'blockquote':
  case 'bullet_list':
  case 'em':
  case 'inline':
  case 'link':
  case 'list_item':
  case 'paragraph':
  case 'strong':
  case 'heading': {
    const tag = token.tag as any;
    const props = attrProps(token.attrs);

    if (token.type === 'heading') {
      return (
        <Heading
          Tag={tag}
          label={getText(token)}
          {...props}
        />
      );
    }

    // Open links in another tab
    if (token.type === 'link') {
      if (props.href && !props.href.startsWith('/')) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
      }
    }

    return (
      <Tokens
        tokens={token.children}
        tag={tag}
        props={props}
      />
    );
  }
  default:
    throw Error(`Cannot handle murky token with type: ${token.type}`);
    return null;
  }
};

export default MurkyToken;
