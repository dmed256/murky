import React from 'react';

import history from '../history';


interface Props {
  Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  label: string,
}

const Heading = ({ Tag, label, ...props }: Props) => {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <Tag id={id} {...props}>
      <a href={`#${history.pathname}#${id}`}>
        {label}
      </a>
    </Tag>
  );
}

export default Heading;
