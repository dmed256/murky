import React from 'react';

import BlockToken from './BlockToken';
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
        tokens
          .map((token, index) => {
            if (token.tokenType === 'murky') {
              return (
                <BlockToken
                  key={index}
                  type={token.type}
                  children={token.children}
                />
              );
            }
            return (
              <Token
                key={index}
                token={token}
              />
            );
          })
      }
    </React.Fragment>
  );
};

export default Markdown;
