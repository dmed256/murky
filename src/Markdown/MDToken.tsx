import React from 'react';

import Code from './Code';
import * as types from './types';


interface Props {
  token: types.MDToken,
}

const MDToken = ({ token }: Props) => {
  switch (token.type) {
    case 'code_inline':
      return <code>{token.content}</code>;
    case 'softbreak':
      return <br />;
    case 'text':
      return <React.Fragment>{token.content}</React.Fragment>;
    case 'code':
      return (
        <Code
          source={token.content}
          lang={token.info}
        />
      );
    default:
      console.error(`Cannot handle md token with type: ${token.type}`);
      return null;
  }
};

export default MDToken;
