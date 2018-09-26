import React from 'react'

import MDToken from './MDToken';
import MurkyToken from './MurkyToken';
import { getPlugin } from './tokenizer';
import * as types from './types';


interface Props {
  token: types.Token,
}

const Token = ({ token }: Props) => {
  switch (token.tokenType) {
    case 'md':
      return <MDToken token={token} />;
    case 'murky':
      return <MurkyToken token={token} />;
    case 'murky_plugin':
      const { plugin, props, children } = token;
      const Plugin = getPlugin(plugin).Component;
      return <Plugin tokens={children} {...props} />
  }
};

export default Token;
