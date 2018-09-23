import React from 'react';

import Token from './Token';
import * as types from './types';
import { attrProps } from './tokenizer';


interface Props {
  token: types.MurkyToken;
}

const MurkyToken = ({ token }: Props) => {
  let Component = token.tag || React.Fragment;
  switch (token.type) {
    case 'blockquote':
    case 'bullet_list':
    case 'em':
    case 'heading':
    case 'inline':
    case 'link':
    case 'list_item':
    case 'paragraph':
      return (
        <Component {...attrProps(token.attrs)}>
          {
            token.children.map((childToken, index) => (
              <Token key={index} token={childToken} />
            ))
          }
        </Component>
      );
    case 'tabs':
      return null;
    default:
      console.error(`Cannot handle murky token with type: ${token.type}`);
      return null;
  }
};

export default MurkyToken;
