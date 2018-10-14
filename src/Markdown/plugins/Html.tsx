import React from 'react';

import * as types from '../types';

interface Props {
  tokens: types.Token[],
  html: string,
}

const Html = ({ html }: Props) => (
  <div dangerouslySetInnerHTML={{
      __html: html,
    }} />
);

export const plugin = {
  name: 'html',
  Component: Html,
  requiredProps: ['html'],
  optionalProps: [],
};


export default Html;
