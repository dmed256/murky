import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';


interface Props {
  classes: any,
}

const LandingPage = ({ classes }: Props) => (
  <div className={classes.root}>
  </div>
);

const styles = {
  root: {
  },
};

export default withStyles(styles)(LandingPage);
