import React from 'react';

interface Props {
  depth: number,
  text: string,
};

const Heading = ({ depth, text }: Props) => {
  const Hn = `h${depth}`;
  return <Hn>{text}</Hn>
};

export default Heading;
