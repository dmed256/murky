import React from 'react';

import { highlight } from './prism';


interface Props {
  source: string,
  lang?: string,
};

const Code = ({ source, lang }: Props) => (
  <pre data-lang={(lang || '').toUpperCase()}>
    <code className={lang ? `lang-${lang}` : undefined}>
      {highlight(source, lang)}
    </code>
  </pre>
);

export default Code;
