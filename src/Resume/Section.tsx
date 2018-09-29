import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';


interface Props {
  classes: any,
  children?: any,
  title: string,
}

const Section = ({ classes, children, title }: Props) => (
  <div className={classes.root}>
    <div className={classes.title}>
      {title}
    </div>
    <div className={classes.content}>
      {children}
    </div>
  </div>
);

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    position: 'relative' as 'relative',
    marginTop: 50,
    paddingTop: 20,
    borderTop: '1px solid #c2c8ce',
    '&:before': {
      content: '""',
      position: 'absolute' as 'absolute',
      left: 0,
      top: -2,
      height: 3,
      width: 50,
      // Use border to show up when printing
      borderTop: '3px solid #34495e',
    },
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
