import React from 'react';

import { Token } from './types';


interface Props {
  type: string,
  tokens: Token[],
}

const BlockToken = ({ type, tokens }: Props) => {
  return <div />;
};

export default BlockToken;
