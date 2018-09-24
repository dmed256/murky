import React from 'react';

import Token from './Token';
import * as types from './types';


interface Props {
  children: types.Token[],
  tag?: string,
  props?: any,
}

const Tokens = ({ children, tag, props }: Props) => {
  const Component = tag || React.Fragment;
  return (
    <Component {...(props || {})}>
      {
        children.map((childToken, index) => (
          <Token key={index} token={childToken} />
        ))
      }
    </Component>
  );
};

export default Tokens;
