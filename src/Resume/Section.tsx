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
    position: 'relative' as 'relative',
    margin: '50px 0',
    padding: '20px 0',
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
      width: 120,
      fontSize: 15,
    },
  },
  content: {
    flex: 1,
    backgroundColor: 'blue',
  },
}

export default withStyles(styles)(Section);
