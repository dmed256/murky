import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Code from './Markdown/Code';
import config from './config';


interface Props {
  classes: any,
  pathname: string,
}

const ErrorPage = ({ classes, pathname }: Props) => {
  return (
    <div>
      <a
        className={classes.image}
        href={config.error.imageCredit}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={config.error.image} />
      </a>
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
    raise NotImplementedError('File not found')
NotImplementedError: File not found
      `.trim()}
        lang="python"
      />
      <Code
        source={"404: File not found"}
        lang="html"
      />
    </div>
  );
};

const styles = {
  image: {
    display: 'block',
    position: 'relative' as 'relative',
    width: 336,
    height: 200,
    margin: '0 auto 40px',
    '&:hover:after': {
      content: 'attr(href)',
      position: 'absolute' as 'absolute',
      left: 168,
      bottom: -20,
      transform: 'translateX(-50%) translateY(50%) rotate(15deg)',
      fontSize: 14,
      padding: '0.5em 1em',
      color: 'white',
      backgroundColor: 'rgba(88, 95, 101, 0.9)',
    },
    '@media(max-width: 700px)': {
      width: '100%',
      height: 'auto',
    },
  },
};

export default withStyles(styles)(ErrorPage);
