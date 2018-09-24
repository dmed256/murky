import React from 'react';

import Code from './Markdown/Code';


interface Props {
  pathname: string,
}

const ErrorPage = ({ pathname }: Props) => (
  <div>
    <div style={{
      fontSize: 40,
      textTransform: 'uppercase',
      textAlign: 'center',
    }}>
      Oh No
    </div>
    <Code
      source={"Segmentation fault (core dumped)"}
      lang="cpp"
    />
    <Code
      source={"[Object object]"}
      lang="js"
    />
    <Code
      source={`
Traceback (most recent call last):
  File "${pathname}", line 1, in <module>
    raise NotImplementedError('No source found')
NotImplementedError: No source found
      `.trim()}
      lang="python"
    />
    <Code
      source={"404"}
      lang="html"
    />
  </div>
);

export default ErrorPage;
