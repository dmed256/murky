import React from 'react';

import MurkyToken from './MurkyToken';
import MDToken from './MDToken';
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
                <MurkyToken
                  key={index}
                  type={token.type}
                  children={token.children}
                />
              );
            }
            return (
              <MDToken
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
