import React from 'react'

import MDToken from './MDToken';
import MurkyToken from './MurkyToken';
import { Token } from './types';


interface Props {
  token: Token,
}

const Token = ({ token }: Props) => (
  (token.tokenType === 'murky')
  ? <MurkyToken token={token} />
  : <MDToken token={token} />
);

export default Token;
