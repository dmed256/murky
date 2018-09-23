import React from 'react';

import { Token } from './types';


interface Props {
  type: string,
  children: Token[],
}

const MurkyToken = ({ type, children }: Props) => {
  return <div />;
};

export default MurkyToken;
