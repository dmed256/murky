import React from 'react';

import { getText } from '../tokenizer';
import * as types from '../types';

interface Props {
  tokens: types.Token[],
}

const Html = ({ tokens }: Props) => (
  <div dangerouslySetInnerHTML={{
      __html: getText(tokens[0])
    }} />
);

export const plugin = {
  name: 'html',
  Component: Html,
  requiredProps: [],
  optionalProps: [],
  varArgs: false,
};


export default Html;
