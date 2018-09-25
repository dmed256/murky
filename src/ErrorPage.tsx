import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Code from './Markdown/Code';
import ohno from './images/ohno.png';


interface Props {
  classes: any,
  pathname: string,
}

const ErrorPage = ({ classes, pathname }: Props) => (
  <div>
    <div className={classes.ohno}>
      <img src={ohno} />
      <a
        className={classes.ohnoText}
        href="http://webcomicname.com"
        target="_blank"
        rel="noreferrer"
      >
        webcomicname.com
      </a>
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

const styles = {
  ohno: {
    position: 'relative' as 'relative',
    display: 'block',
    margin: '0 auto 40px',
    width: 336,
    height: 200,
    '@media(max-width: 700px)': {
      width: 168,
      height: 100,
    },
  },
  ohnoText: {
    position: 'absolute' as 'absolute',
    right: 3,
    bottom: 3,
    fontSize: 10,
    color: 'white !important',
    textTransform: 'uppercase' as 'uppercase',
  },
};

export default withStyles(styles)(ErrorPage);
