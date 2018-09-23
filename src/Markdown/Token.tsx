import React from 'react';

import Code from './Code';
import { MDToken } from './types';


interface Props {
  token: MDToken,
}

const Token = ({ token }: Props) => {
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

export default Token;
