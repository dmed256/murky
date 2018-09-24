import React from 'react';

import Token from './Token';
import * as types from './types';


interface Props {
  tokens: types.Token[],
  tag?: string,
  props?: any,
}

const Tokens = ({ tokens, tag, props }: Props) => {
  const Component = tag || React.Fragment;
  return (
    <Component {...(props || {})}>
      {
        tokens.map((childToken, index) => (
          <Token key={index} token={childToken} />
        ))
      }
    </Component>
  );
};

export default Tokens;
