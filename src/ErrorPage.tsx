import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Code from './Markdown/Code';
import config from './config';


interface Props {
  classes: any,
  pathname: string,
}

const ErrorPage = ({ classes, pathname }: Props) => {
  // Add a credit label
  let label;
  if (config.error.label) {
    if (config.error.creditUrl) {
      label = (
        <a
          className={classes.imageCredit}
          href={config.error.creditUrl}
          target="_blank"
          rel="noreferrer"
        >
          {config.error.label}
        </a>
      );
    } else {
      label = (
        <div className={classes.imageCredit}>
          {config.error.label}
        </div>
      );
    }
  }

  return (
    <div>
      <div className={classes.imageContainer}>
        <img src={config.error.image} />
        {label}
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
  imageContainer: {
    position: 'relative' as 'relative',
    display: 'block',
    margin: '0 auto 40px',
    width: 336,
    height: 200,
    '@media(max-width: 700px)': {
      height: 'auto',
    },
  },
  imageCredit: {
    position: 'absolute' as 'absolute',
    right: 3,
    bottom: 3,
    fontSize: 10,
    color: 'white !important',
    textTransform: 'uppercase' as 'uppercase',
  },
};

export default withStyles(styles)(ErrorPage);
