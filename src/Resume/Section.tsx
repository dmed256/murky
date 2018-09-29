import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import SubSection from './SubSection';


interface Props {
  classes: any,
  children: React.ReactNode[],
  title: string,
}

const Section = ({ classes, children, title }: Props) => (
  <div className={classes.root}>
    <div className={classes.innerRoot}>
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  </div>
);

const styles = {
  root: {
    flex: 1,
    position: 'relative' as 'relative',
    marginTop: 50,
    // Fake border to keep the bold line in the same page
    borderTop: '1px solid white',
    breakInside: 'avoid' as 'avoid',
    '&:before': {
      content: '""',
      position: 'absolute' as 'absolute',
      left: 0,
      top: -1,
      width: 50,
      // Use border to show up when printing
      borderTop: '3px solid #34495e',
    },
  },
  innerRoot: {
    display: 'flex',
    borderTop: '1px solid #c2c8ce',
    paddingTop: 20,
  },
  title: {
    width: 160,
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase' as 'uppercase',
    lineHeight: '1.1em',
    '@media print': {
      width: 110,
      fontSize: 15,
    },
  },
  content: {
    flex: 1,
  },
}

export default withStyles(styles)(Section);
