import React from 'react';

import Token from './Token';
import tokenizer from './tokenizer';


interface Props {
  content: string,
}

const Markdown = ({ content }: Props) => (
  <React.Fragment>
    {
      tokenizer(content).map((token, index) => (
        <Token key={index} token={token} />
      ))
    }
  </React.Fragment>
);

export default Markdown;
