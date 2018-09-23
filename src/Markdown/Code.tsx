import React from 'react';

import { highlight } from './prism';


interface Props {
  text: string,
  lang?: string,
};

const Code = ({ text, lang }: Props) => (
  <pre data-lang={(lang || '').toUpperCase()}>
    <code className={lang ? `lang-${lang}` : undefined}>
      {highlight(text, lang)}
    </code>
  </pre>
);

export default Code;
