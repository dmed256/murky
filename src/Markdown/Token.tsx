import React from 'react'

import MDToken from './MDToken';
import MurkyToken from './MurkyToken';
import * as types from './types';


interface Props {
  token: types.Token,
}

const Token = ({ token }: Props) => (
  (token.tokenType === 'murky')
  ? <MurkyToken token={token} />
  : <MDToken token={token} />
);

export default Token;
