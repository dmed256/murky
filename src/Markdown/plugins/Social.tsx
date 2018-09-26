import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import * as types from '../types';

interface Props {
  classes: any,
  tokens: types.Token[],
}

const Social = ({ classes, tokens }: Props) => (
  <div className={classes.root}>
  </div>
);

const styles = {
  root: {
  },
};

export default {
  name: 'social',
  Component: withStyles(styles)(Social),
  requiredProps: [],
  optionalProps: ['center'],
  varArgs: false,
};
