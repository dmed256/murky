import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';


interface Props {
  classes: any,
  children?: any,
  title: string,
}

const Section = ({ classes, children, title }: Props) => (
  children || null
);

const styles = {
  root: {
  },
}

export default withStyles(styles)(Section);
