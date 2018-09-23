import React from 'react';

import Code from './Code';
import tokenizer from './tokenizer';


interface Props {
  content: string,
}

const Markdown = ({ content }: Props) => (
  <React.Fragment>
  {
    tokenizer(content)
      .filter((token) => token.type === 'fence')
      .map((token: any, index) => (
        <Code
          key={index}
          source={token.content}
          lang={token.info}
        />
      ))
  }
  </React.Fragment>
);

export default Markdown;
