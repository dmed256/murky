import React from 'react';
import mdit from 'markdown-it';

import { highlight } from './prism';


const md = mdit({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});


interface Props {
  content: string,
}

const Markdown = ({ content }: Props) => (
  <div dangerouslySetInnerHTML={{
    __html: md.render(content)
  }} />
);

export default Markdown;
