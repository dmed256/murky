import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';


interface Props {
  classes: any,
  children?: any,
}

const SubSection = ({ classes, children }: Props) => (
  children || null
);

const styles = {
  root: {
  },
}

export default withStyles(styles)(SubSection);
