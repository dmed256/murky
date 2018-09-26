import React from 'react';

import history from '../history';
import Tokens from './Tokens';
import { Indent, Note, Tabs } from './plugins';
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
      let tag = token.tag as any;
      let props = attrProps(token.attrs);
      // Setup id and <a> wrapper for headers
      if (token.type === 'heading') {
        const Tag = tag;
        const id = (
          getText(token)
          .replace(/\s+/g, '-')
          .toLowerCase()
        );
        props = { ...props, id };
        tag = ({ children, ...props }: any) => (
          <Tag id={id} {...props}>
            <a href={`#${history.pathname}#${id}`}>
              {children}
            </a>
          </Tag>
        );
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
      console.error(`Cannot handle murky token with type: ${token.type}`);
      return null;
  }
};

export default MurkyToken;
