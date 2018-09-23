import React from 'react';
import marked from 'marked';


interface Props {
  content: string,
}

const Markdown = ({ content }: Props) => {
  console.log({ marked: marked.lexer(content) });
  return <div />;
};

export default Markdown;
