import React from 'react';

import Code from './Code';
import * as types from './types';


interface Props {
  token: types.MDToken,
}

const MDToken = ({ token }: Props) => {
  if (token.type === 'code') {
    return (
      <Code
        source={token.content}
        lang={token.info}
      />
    );
  }
  return null;
};

export default MDToken;
