import React from 'react';

import Token from './Token';
import tokenizer from './tokenizer';


interface Props {
  content: string,
}

const Markdown = ({ content }: Props) => {
  const tokens = tokenizer(content);
  console.log(tokens);
  return (
    <React.Fragment>
      {
        tokens.map((token, index) => (
          <Token key={index} token={token} />
        ))
      }
    </React.Fragment>
  );
};

export default Markdown;
